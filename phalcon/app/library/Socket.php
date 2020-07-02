<?php

namespace app\library;

use \WebSocket\Client;

/* WebSocket客户端 */
class Socket{

  static private $client = null;

  /* 发送 */
  static function send($msg){
    // 链接
    if(!self::$client){
      $config = require APP_PATH.'/config/env.php';
      self::$client = new Client('ws://'.$config['socket_ip'].':'.$config['socket_port'].'/?token='.$config['key']);
    }
    // 发送
    self::$client->send(json_encode($msg));
    // echo self::$client->receive();
  }

  /* 发送-cli */
  static function sendCli($msg){
    $config = require APP_PATH.'/config/env.php';
    exec($config['cli'].'socket send \''.json_encode($msg).'\' 2>&1');
  }

}