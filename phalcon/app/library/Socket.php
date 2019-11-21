<?php

namespace app\library;

/* Socket 客户端 */

class Socket{

  /* 客户端-链接 */
  static function send($msg){
    $config = require APP_PATH.'/config/env.php';
    $client = new \WebSocket\Client($config['socket'].'?token='.$config['key']);
    $client->send($msg);
    // echo $client->receive();
  }

}