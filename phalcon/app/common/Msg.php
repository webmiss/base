<?php
namespace app\common;

/* 消息类 */
class Msg extends Base {

  private static $clients = null;
  private static $token = '';

  /* 路由 */
  static function router($clients,$socket,$msg,$token): void {
    // 参数
    self::$clients = $clients;
    self::$token = $token;
    // 数据
    $data = json_decode($msg);
    if(!is_object($data)) $socket->send(self::getJSON(['code'=>400,'msg'=>'格式错误!']));
    // 消息
    elseif($data->type=='msg') self::msg($socket,$data);
    // 心跳
    else $socket->send(self::getJSON(['type'=>'','code'=>0,'msg'=>'成功']));
  }

  /* 消息 */
  static function msg($socket,$data){
    print_r(json_encode(self::$token).' '.json_encode($data)."\n");
  }

}