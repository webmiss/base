<?php

use \Swoole\WebSocket\Server as WebSocket;
use app\model\UserMsg;

class SocketTask extends Base{

  static private $name = 'BaseSocket';
  static private $uid = '';

  /* 首页 */
  function mainAction(){

    /* Socket服务器 */
    $server = new WebSocket($this->config->socket_ip, $this->config->socket_port);

    /* 链接成功 */
    $server->on('open', function ($server, $request) {
      // 记录FD
      $token = isset($request->get['token'])?$request->get['token']:'';
      self::$uid = isset($request->get['uid'])?$request->get['uid']:'';
      // 验证Token

      // if((strlen($token)>64 && $res=self::verToken($token))){
      //   self::$cid = $res->uid;
      //   // 记录FD
      //   $this->redis->hSet('Fd',$request->fd,self::$uid);
      //   $this->redis->hSet('SocketUid',self::$uid,$request->fd);
      // }else{
      //   $server->disconnect($request->fd);
      // }
    });
    
    /* 监听消息 */
    $server->on('message', function ($server, $frame) {
      self::getRouter($server, $frame);
    });

    /* 退出 */
    $server->on('close', function ($ser, $fd) {
      $uid = $this->redis->hGet(self::$name.'Fd',$fd);
      if($uid){
        $this->redis->hDel(self::$name.'Fd',$fd);
        $this->redis->hDel(self::$name.'Uid',$uid);
      }
    });

    /* 启动 */
    $server->start();
  }

}