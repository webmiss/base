<?php
namespace Service;

use Ratchet\WebSocket\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/* 数据类 */
class Socket implements MessageComponentInterface {

  public $clients; //连接

  /* 连接 */
  function onOpen(ConnectionInterface $conn) {
    // 参数
    $param = (array)$conn->httpRequest->getUri();
    $data = [];
    foreach($param as $val) $data[] = $val;
    print_r($param);
    print_r($data[5]);
    $arr = urlencode($data[5]);
    print_r($arr);
    // 验证
    // 保存
    // $this->clients->attach($conn);
  }

  /* 关闭 */
  function onClose(ConnectionInterface $conn) {
    // $this->clients->detach($conn);
  }
  /* 错误 */
  function onError(ConnectionInterface $conn, \Exception $e) {
    return $conn->close();
  }

  /* 消息 */
  function onMessage(ConnectionInterface $from, $msg) {

  }

}