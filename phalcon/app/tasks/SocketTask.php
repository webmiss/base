<?php
use app\Env;
use app\common\Base;

use app\config\Socket;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;

class SocketTask extends Base{

  /* 启动 */
  function startAction(){
    $ws = new WsServer(new Socket);
    $server = IoServer::factory(new HttpServer($ws),Env::$socket_port);
    $ws->enableKeepAlive($server->loop,30);
    $server->run();
  }

}