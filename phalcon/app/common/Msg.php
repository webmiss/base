<?php
namespace app\common;

/* 消息类 */
class Msg extends Base {

  private $fds = '';
  private $token = '';

  /* 路由 */
  function router($fds,$server,$fd,$msg,$token): void {
    // 参数
    $this->fds = $fds;
    $this->token = $token;
    $data = json_decode($msg);
    if(!is_object($data)) $server->push($fd, self::getJSON(['code'=>400,'msg'=>'格式错误!']));
    // 消息
    elseif($data->type=='msg') $this->msg($server,$fd,$data);
    // 心跳
    else $server->push($fd,self::getJSON(['code'=>0,'msg'=>'成功']));
  }

  /* 消息 */
  function msg($server,$fd,$data){
    # 服务器: php cli.php socket start
    # 客户端: php cli.php socket send admin '{"type":"msg","uid":"1","data":[]}'
    print_r(json_encode($this->token).' '.json_encode($data));
    // 指定用户
    if(isset($this->fds[$data->uid])){
      $fd = $this->fds[$data->uid];
      $server->push($fd,self::getJSON(['type'=>'msg','code'=>0,'msg'=>'消息']));
    }
  }

}