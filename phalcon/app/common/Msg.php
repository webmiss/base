<?php
namespace app\common;

/* 消息类 */
class Msg extends Base {

  private static $fds = '';
  private static $token = '';

  /* 路由 */
  static function router($fds,$socket,$fd,$msg,$token): void {
    // 参数
    self::$fds = $fds;
    self::$token = $token;
    // 数据
    $data = json_decode($msg);
    if(!is_object($data)) $socket->push($fd, self::getJSON(['code'=>400,'msg'=>'格式错误!']));
    // 消息
    elseif($data->type=='msg') self::msg($socket,$fd,$data);
    // 心跳
    else $socket->push($fd,self::getJSON(['type'=>'','code'=>0,'msg'=>'成功']));
  }

  /* 消息 */
  static function msg($socket,$fd,$data){
    print_r(json_encode(self::$token).' '.json_encode($data)."\n");
    // 指定用户
    if(isset(self::$fds[$data->uid])){
      $fd = self::$fds[$data->uid];
      $socket->push($fd,self::getJSON(['type'=>'msg','code'=>0,'msg'=>$data->msg]));
    }
  }

}