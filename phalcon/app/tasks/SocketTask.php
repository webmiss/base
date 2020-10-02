<?php

use \Swoole\WebSocket\Server as WebSocket;
use \Swoole\Coroutine\Http\Client;
use app\library\Inc;

class SocketTask extends TaskBase{

  /* 属性 */
  private $msg_limit = 100;  // 消息总条数
  private $suid = '0';        // 系统消息ID
  private $uid = '';         // 用户ID
  private $name_fd = '';     // 缓存:SocketFD
  private $name_uid = '';    // 缓存:用户ID

  /* 构造函数 */
  function initialize(){
    $this->name_fd = $this->config->socket_name.'Fd';
    $this->name_uid = $this->config->socket_name.'Uid';
  }

  /* 消息路由 */
  private function getRouter($server,$frame){
    // 参数
    $data = json_decode($frame->data);
    if(!is_object($data)) return $server->push($frame->fd, json_encode(['code'=>400,'msg'=>'格式错误']));
    /* 消息 */
    elseif($data->type=='msg') $this->msg($server,$frame,$data);
  }

  /* 消息 */
  private function msg($server,$frame,$data){
    // 消息-保存
    $msg = (Object)[];
    $msg->id = Inc::getId();
    $msg->type = '0';
    $msg->uid = $data->data->uid;
    $msg->fid = $data->data->fid;
    $msg->title = $data->data->title;
    $msg->content = $data->data->content;
    $msg->ctime = date('Y-m-d H:i:s');
    // 列队
    $this->redis()->rPush($this->config->socket_name.'MsgList',json_encode($msg));
    // 消息-结果
    $res = (Object)[];
    $res->code = 0;
    $res->type = 'msg';
    $res->time = $msg->id;
    $res->data = $msg;
    // 推送消息
    $fd = $this->redis()->hGet($this->name_uid,$msg->uid);
    if($server->isEstablished($fd)) $server->push($fd, json_encode($res));
    $fd = $this->redis()->hGet($this->name_uid,$msg->fid);
    if($server->isEstablished($fd)) $server->push($fd, json_encode($res));
    // 保存
    $this->_saveMsg();
  }
  // 保存消息
  private function _saveMsg(){
    while($data=$this->redis()->blPop($this->config->socket_name.'MsgList',3)){
      $data = json_decode($data[1],true);
      $sql = $this->getSql(['type'=>'add','table'=>'user_msg','data'=>$data]);
      $this->db()->execute($sql);
    }
  }

  /* 客户端 */
  function sendAction($data=''){
    // 参数
    $data = json_decode($data);
    if(empty($data)) exit('必须数组!');
    // 系统Token
    $token = $this->config->key;
    // 链接
    $client = new Client('127.0.0.1',$this->config->socket_port);
    // 协程
    go(function () use ($client,$token,$data) {
      $res = $client->upgrade('/?token='.$token);
      if($res) return $client->push(json_encode($data));
    });
  }

  /* 启动 */
  function startAction(){

    /* Socket服务器 */
    $server = new WebSocket($this->config->socket_ip, $this->config->socket_port);
    // 清理缓存
    if($this->redis()->get($this->name_fd)) $this->redis()->delete($this->name_fd);
    if($this->redis()->get($this->name_uid)) $this->redis()->delete($this->name_uid);

    /* 链接成功 */
    $server->on('open',function($server,$request){
      // 验证Token
      if(!isset($request->get['token'])) return false;
      $token = $request->get['token'];
      $res = $this->verToken($token);
      if(isset($res->uid) || $token==$this->config->key){
        // 用户ID
        $this->uid = isset($res->uid)?$res->uid:$this->suid;
        // 记录FD
        $this->redis()->hSet($this->name_fd,$request->fd,$this->uid);
        $this->redis()->hSet($this->name_uid,$this->uid,$request->fd);
      }else{
        $server->disconnect($request->fd);
      }
    });
    /* 退出 */
    $server->on('close',function ($ser,$fd){
      $uid = $this->redis()->hGet($this->name_fd,$fd);
      if($uid){
        $this->redis()->hDel($this->name_fd,$fd);
        if($this->redis()->hGet($this->name_uid,$uid)){
          $this->redis()->hDel($this->name_uid,$uid);
        }
      }
    });
    /* 监听消息 */
    $server->on('message',function($server,$frame) {
      $this->getRouter($server, $frame);
    });
    /* 启动 */
    $server->start();
  }

}