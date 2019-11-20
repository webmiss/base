<?php

namespace app\library;

/* Socket 客户端 */

class Socket{

  static private $client=null;

  /* 客户端-链接 */
  static function send($msg){
    self::connect();
    self::$client->send($msg);
    return self::$client->receive();
  }

  /* 客户端-链接 */
  static private function connect(){
    $config = require APP_PATH.'/config/env.php';
    if(!self::$client) self::$client = new \WebSocket\Client($config['socket'].'?token='.$config['key']);
  }

}