<?php
declare(strict_types=1);
namespace Cli;

use Phalcon\Cli\Task;

use Config\Socket as cfg;
use Service\Socket;

use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;

class SocketTask extends Task {

  /* 启动 */
  function startAction(){
    $ws = new WsServer(new Socket);
    $server = IoServer::factory(new HttpServer($ws), cfg::$port, cfg::$host);
    $ws->enableKeepAlive($server->loop,30);
    $server->run();
  }

}