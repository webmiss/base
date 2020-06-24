<?php

use \Swoole\WebSocket\Server as WebSocket;
use \Swoole\Coroutine\Http\Client;
use app\library\Centre;

class SocketTask extends TaskBase{

  /* 属性 */
  static private $msg_limit = 100;  // 消息总条数
  static private $suid = '0';        // 系统消息ID
  static private $uid = '';         // 用户ID
  static private $name_fd = '';     // 缓存:SocketFD
  static private $name_uid = '';    // 缓存:用户ID

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
    /* 消息组 */
    if($data->type=='group') $this->msgGroup($server,$frame,$data);
    /* 消息 */
    elseif($data->type=='msg') $this->msg($server,$frame,$data);
  }

  /* 消息组 */
  private function msgGroup($server,$frame,$data){
    // 是否用户
    if(empty($this->uid)) return false;
    // 100条分组
    $all = $this->db()->fetchAll(
      'SELECT * FROM user_msg WHERE is_del NOT LIKE "%\"'.$this->uid.'\"%" AND (fid='.$this->uid.' OR uid='.$this->uid.') LIMIT 0,'.$this->msg_limit
    );
    // 分组
    $tmpData = [];
    $num = [];
    foreach($all as $val){
      // 是否用户
      $gid = $val['uid']!=$this->uid?'uid':'fid';
      // 是否已读
      $is_new = json_decode($val['is_new'],1);
      $is_new = in_array((string)$this->uid,$is_new)?'1':'0';
      // 组信息
      $tmpData[(string)$val[$gid]]['fid'] = $val[$gid];
      $tmpData[(string)$val[$gid]]['num'] = 0;
      $tmpData[(string)$val[$gid]]['msg'][] = [
        'id'=>$val['id'],
        'type'=>$val['type'],
        'fid'=>$val['fid'],
        'ctime'=>$val['ctime'],
        'title'=>$val['title'],
        'content'=>$val['content'],
        'img'=>$this->_getImg($val['fid']),
        'is_new'=>$is_new,
      ];
      // 记录未读
      if($is_new=='0'){
        if(isset($num[(string)$val[$gid]])) $num[(string)$val[$gid]]++;
        else $num[(string)$val[$gid]] = 1;
      }
    }
    // 未读数量
    foreach($num as $key=>$val){
      $tmpData[(string)$key]['num'] = $val;
    }
    // 倒序
    foreach($tmpData as $key=>$val){
      $tmpData[$key]['name'] = $this->_getName($key);
      $tmpData[$key]['img'] = $this->_getImg($key);
      $tmpData[$key]['msg'] = array_reverse($val['msg']);
    }
    // 结果
    $msg = (Object)[];
    $msg->code = 0;
    $msg->type = 'group';
    $msg->data = (Object)$tmpData;
    return $server->push($frame->fd, json_encode($msg));
  }

  /* 消息 */
  private function msg($server,$frame,$data){
    // 消息-保存
    $msg = (Object)[];
    $msg->id = $this->getId();
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

  /* 用户头像 */
  private function _getImg($uid){
    $img = $this->redis()->get($this->config->socket_name.'uImg'.$uid);
		if(!$img){
      $res = Centre::uinfo($uid);
      $img = $res->code==0?$res->info->img:'';
      $this->redis()->setex($this->config->socket_name.'uImg'.$uid,10*60,$img);
    }
    return $img;
  }
  /* 用户昵称 */
  private function _getName($uid){
    $name = $this->redis()->get($this->config->socket_name.'uName'.$uid);
		if(!$name){
      $res = Centre::uinfo($uid);
      $name = $res->code==0?$res->info->nickname:'';
      $this->redis()->setex($this->config->socket_name.'uName'.$uid,10*60,$name);
    }
    return $name;
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