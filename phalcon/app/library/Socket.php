<?php

namespace app\library;

use \WebSocket\Client;

/* Socket 客户端 */

class Socket{

  /* 客户端-链接 */
  static function send($msg){
    $config = require APP_PATH.'/config/env.php';
    $client = new Client($config['socket'].'?token='.$config['key']);
    $client->send($msg);
    // echo $client->receive();
  }

}