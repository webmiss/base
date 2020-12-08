<?php
use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\common\ApiToken;
use app\common\Msg;
use app\library\Redis;

use \Swoole\WebSocket\Server as WebSocket;
use \Swoole\Coroutine\Http\Client;

class SocketTask extends Base{

  /* 属性 */
  private $suid = '0';      //系统消息ID
  private $uid = '';        //用户ID
  private $token = [];      //Token
  private $fd_name = '';    // 缓存:SocketFD
  private $uid_name = '';   // 缓存:用户ID

  /* 构造函数 */
  function initialize(){
    $this->fd_name = Env::$socket_name.'Fd';
    $this->uid_name = Env::$socket_name.'Uid';
  }

  /* 客户端 */
  function sendAction($type='admin',$data=''){
    $token = Env::$key;
    $client = new Client(Env::$socket_ip,Env::$socket_port);
    // 协程
    go(function () use ($client,$type,$token,$data) {
      $res = $client->upgrade('/?type='.$type.'&token='.$token);
      if($res) return $client->push($data);
    });
  }

  /* 启动 */
  function startAction(){
    // Socket服务器
    $server = new WebSocket(Env::$socket_ip, Env::$socket_port);
    // 链接
    $server->on('open',function($server,$request){
      // 清理缓存
      if(Redis::run()->get($this->fd_name)) Redis::run()->del($this->fd_name);
      if(Redis::run()->get($this->uid_name)) Redis::run()->del($this->uid_name);
      // Token
      $token = $request->get['token']??'';
      if(empty($token)) return $this->errer($server,$request->fd,'Socket参数错误!');
      // 类型
      $res = [];
      $type = $request->get['type']??'';
      if($type=='admin') $res = AdminToken::socket($token);
      elseif($type=='api') $res = ApiToken::socket($token);
      else return $this->errer($server,$request->fd,'Socket参数错误!');
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
        // 记录FD
        Redis::run()->hSet($this->fd_name,$request->fd,$this->uid);
        Redis::run()->hSet($this->uid_name,$this->uid,$request->fd);
      }else{
        return $this->errer($server,$request->fd,$res['msg']);
      }
    });
    // 关闭
    $server->on('close',function ($ser,$fd){
      $uid = Redis::run()->hGet($this->fd_name,$fd);
      if($uid){
        Redis::run()->hDel($this->fd_name,$fd);
        Redis::run()->hDel($this->uid_name,$uid);
      }
    });
    // 消息
    $server->on('message',function($server,$frame) {
      $fds = Redis::run()->hGetAll($this->uid_name);
      Msg::router($fds,$server,$frame->fd,$frame->data,$this->token);
    });
    // 启动
    $server->start();
  }

  /* 错误信息 */
  private function errer($server,$fd,$msg){
    $server->push($fd,self::getJSON(['code'=>4000,'msg'=>$msg]));
    return $server->disconnect($fd);
  }

}