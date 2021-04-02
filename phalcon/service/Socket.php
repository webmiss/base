<?php
namespace Service;

use Config\Env;
use Service\ApiToken;
use Service\AdminToken;
use Util\Util;

use Ratchet\WebSocket\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/* 数据类 */
class Socket implements MessageComponentInterface {

  public $clients=null; //连接
  public $uids=[];      //Uid

  /* 构造函数 */
  function __construct() {
    $this->clients = new \SplObjectStorage;
  }

  /* 路由 */
  function router(string $uid, $conn, $msg): void {
    $data = json_decode($msg, true);
    if($data['type']=='msg'){
      $this->getMsg($uid, $conn, $data);
    }else{
      $this->send($conn, ['code'=>0, 'type'=>'', 'msg'=>'成功']);
    }
  }

  /* 消息 */
  function getMsg(string $uid, $conn, $msg) {
    print_r($uid);
    print_r($msg);
    // 群发
    if($uid=='0') {
      $this->sendAll($msg);
      return;
    }
    // 单发
    $this->send($conn, [
      'code'=> 0,
      'type'=> 'msg',
      'msg'=> '成功',
      'time'=> date('Y-m-d H:i:s'),
    ]);
  }

  /* 群发 */
  function sendAll($data) {
    foreach ($this->clients as $conn) {
      $this->send($conn, $data);
    }
  }

  /* 单发 */
  function send($conn, $data) {
    $res = json_encode($data);
    $conn->send($res);
  }

  /* 连接 */
  function onOpen(ConnectionInterface $conn) {
    // 验证
    $uid = $this->verify($conn);
    if($uid==''){
      return $conn->close();
    }
    // 连接
    $this->clients->attach($conn);
    $this->uids[$uid] = $conn->resourceId;
  }

  /* 验证 */
  private function verify($conn): string {
    // 参数
    $param = (array)$conn->httpRequest->getUri();
    $data = [];
    foreach($param as $val) $data[] = $val;
    $arr = Util::UrlToArray($data[5]);
    if(empty($arr)) return '';
    $type = $arr['type'];
    $token = $arr['token'];
    if(empty($type) || empty($token)) return '';
    // 验证
    if($token==Env::$key){
      return '0';
    }elseif($type=='api'){
      $tData = ApiToken::token($token);
      if(empty($tData)) return '';
      return (string)$tData->uid;
    }elseif($type=='admin'){
      $tData = AdminToken::token($token);
      if(empty($tData)) return '';
      return (string)$tData->uid;
    }
    return '';
  }

  /* 关闭 */
  function onClose(ConnectionInterface $conn) {
    $this->clients->detach($conn);
    // 移除Uid
    foreach($this->uids as $key=>$val) {
      if($val==$conn->resourceId){
        unset($this->uids[$key]);
        break;
      }
    }
  }
  /* 错误 */
  function onError(ConnectionInterface $conn, \Exception $e) {
    return $conn->close();
  }

  /* 消息 */
  function onMessage(ConnectionInterface $from, $msg) {
    // 验证
    $uid = $this->verify($from);
    if($uid==''){
      return $from->close();
    }
    // 路由
    $this->router($uid, $from, $msg);
  }

}