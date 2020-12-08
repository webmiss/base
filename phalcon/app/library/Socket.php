<?php
namespace app\library;

use app\Env;
use \WebSocket\Client;

/* WebSocket */
class Socket{

  /* 发送 */
  public static function send($type,$msg){
    $url = 'ws://'.Env::$socket_ip.':'.Env::$socket_port.'/?type='.$type.'&token='.Env::$key;
    $ws = new Client($url);
    $ws->send(json_encode($msg));
  }

  /* 发送-Cli */
  public static function sendCli($type,$msg){
    exec(Env::$cli.' socket send '.$type.'  \''.json_encode($msg).'\' 2>&1');
  }

}