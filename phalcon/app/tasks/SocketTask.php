<?php

use \Swoole\WebSocket\Server as WebSocket;
use app\model\Msg;

class SocketTask extends Base{

  /* 首页 */
  function mainAction(){

    /* Socket服务器 */
    $server = new WebSocket('0.0.0.0', $this->config->socket_port);
    /* WSS */
    // $server = new WebSocket('0.0.0.0', $this->config->socket_port,SWOOLE_PROCESS, SWOOLE_SOCK_TCP | SWOOLE_SSL);
    // $server->set(['daemonize'=>false, 'ssl_cert_file'=>$this->config->ssl_cert_file, 'ssl_key_file'=>$this->config->ssl_key_file]);

    /* 链接成功 */
    $server->on('open', function ($server, $request) {
      // 记录FD
      $token = isset($request->get['token'])?$request->get['token']:'';
      if((strlen($token)>64 && $res=self::verToken($token))){
        $this->redis->hMset('SocketFd:'.$request->fd,['uid'=>$res->uid]);
        $this->redis->hSet('SocketUid',$res->uid,$request->fd);
      }elseif($token==$this->config->key){
        $this->redis->hMset('SocketFd:'.$request->fd,['uid'=>'system']);
        $this->redis->hSet('SocketUid','system',$request->fd);
      }else{
        $server->disconnect($request->fd);
      }
    });
    
    /* 监听消息 */
    $server->on('message', function ($server, $frame) {
      self::getRouter($server, $frame);
    });

    /* 退出 */
    $server->on('close', function ($ser, $fd) {
      $uid = $this->redis->hMget('SocketFd:'.$fd,['uid'])['uid'];
      if($uid){
        $this->redis->Del('SocketFd:'.$fd);
        $this->redis->Del('SocketUid',$uid);
      }
    });

    /* 启动 */
    $server->start();
  }

  /* 消息路由 */
  private function getRouter($server, $frame){
    $data = json_decode($frame->data);
    // 格式错误
    if(!is_object($data)){
      $server->push($frame->fd, json_encode(['code'=>400,'msg'=>'格式错误']));
      return false;
    }
    /* 系统消息 */
    $uid = $this->redis->hMget('SocketFd:'.$frame->fd,['uid'])['uid'];
    if($data->type=='system' && $uid=='system'){
      if(isset($data->fds)){
        // 单发
        $data->code = 0;
        $fds = $data->fds;
        unset($data->fds);
        foreach($fds as $fd){
          if($server->isEstablished($fd)) $server->push($fd, json_encode($data));
        }
      }else{
        // 群发
        $data->code = 0;
        foreach($server->connections as $fd){
          $server->push($fd, json_encode($data));
        }
      }
    /* 用户-最新消息 */
    }elseif($data->type=='newMsg'){
      $time = date('Y-m-d H:i:s', strtotime('-10 minute'));
      $model = Msg::find([
        'is_new="0" AND uid='.$uid.' AND ctime > "'.$time.'"',
        'columns'=>'id,title,content,ctime',
        'order'=>'ctime DESC'
      ]);
      $data = $model?$model->toArray():[];
      $data = isset($data[0])?$data[0]:[];
      $data['code'] = 0;
      $data['type'] = 'newMsg';
      $data['num'] = $model?$model->count():0;
      if($server->isEstablished($frame->fd)) $server->push($frame->fd, json_encode($data));
    } 
  }

}