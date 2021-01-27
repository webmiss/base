<?php
namespace app\config;

use app\Env;
use app\common\Inc;
use app\common\AdminToken;
use app\common\ApiToken;
use app\common\Msg;
use app\library\Redis;

use Ratchet\WebSocket\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/* 消息类 */
class Socket implements MessageComponentInterface {

  protected $clients; //连接
  private $suid = '0';      //系统消息ID
  private $uid = '';        //用户ID
  private $token = [];      //Token

  /* 构造函数 */
  public function __construct() {
    $this->clients = new \SplObjectStorage;
  }
  /* 连接 */
  function onOpen(ConnectionInterface $conn) {
    // 参数
    $this->_verify($conn);
    // 保存
    $this->clients->attach($conn);
    // echo $conn->resourceId."\n";
  }
  /* 关闭 */
  function onClose(ConnectionInterface $conn) {
    $this->clients->detach($conn);
    echo '退出: '.$conn->resourceId."\n";
  }
  /* 错误 */
  function onError(ConnectionInterface $conn, \Exception $e) {
    $conn->close();
  }

  /* 验证 */
  private function _verify($conn){
    // 参数
    $param = (array)$conn->httpRequest->getUri();
    $data = [];
    foreach($param as $val) $data[] = $val;
    $param = Inc::urlToArray($data[5]);
    if(empty($param)) return $conn->close();
    // Token
    $token = $param['token']??'';
    if(empty($token)) return $this->errer($conn,'Socket参数错误!');
    // 类型
    $res = [];
    $type = $param['type']??'';
    if($type=='admin') $res = AdminToken::socket($token);
    elseif($type=='api') $res = ApiToken::socket($token);
    else return $this->errer($conn,'Socket参数错误!');
    // 验证
    if($res['state'] || $token==Env::$key){
      // 用户ID
      if($token==Env::$key){
        $this->uid = $this->suid;
        $this->token = (object)['uid'=>$this->suid];
      }else{
        $this->uid = $res['data']->uid;
        $this->token = $res['data'];
      }
    }else{
      return $this->errer($conn,$res['msg']);
    }
  }
  /* 错误信息 */
  private function errer($conn,$msg){
    $conn->send(json_encode(['code'=>4000,'msg'=>$msg]));
    return $conn->close();
  }

  /* 消息 */
  function onMessage(ConnectionInterface $from, $msg) {
    foreach ($this->clients as $client) {
      if($from==$client){
        $this->_verify($client);
        Msg::router($this->clients,$client,$msg,$this->token);
      }
    }
  }
  
}