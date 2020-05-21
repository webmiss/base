<?php

namespace app\library;

use \WebSocket\Client;

/* Socket 客户端 */

class Socket{

  static private $client = null;

  /* WebSocket-发送 */
  static function send($token,$msg){
    // 链接
    if(!self::$client){
      $config = require APP_PATH.'/config/env.php';
      self::$client = new Client($config['socket_client'].'?token='.str_replace(' ','+',$token).'&uid=1');
    }
    // 发送
    self::$client->send(json_encode($msg));
    // echo self::$client->receive();
  }

}