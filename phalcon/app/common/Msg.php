<?php
namespace app\common;

/* 公共类 */
class Msg extends Base {

  /* 路由 */
  function router($server,$frame): void {
    // 参数
    $data = json_decode($frame->data);
    if(!is_object($data)) $server->push($frame->fd, self::getJSON(['code'=>400,'msg'=>'格式错误']));
    // 消息
    elseif($data->type=='msg') $this->msg($server,$frame->fd,$data);
    // 心跳
    else $server->push($frame->fd, self::getJSON(['code'=>0,'msg'=>'成功']));
  }

  /* 消息 */
  function msg($server,$fd,$data){
    print_r($data);
  }

}