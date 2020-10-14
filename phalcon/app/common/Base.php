<?php

namespace app\common;

use Phalcon\Mvc\Controller;

class Base extends Controller{
    
  /* 返回JSON */
  static protected function getJSON($data=''){
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    return json_encode($data);
  }

  /* 调试信息 */
  static protected function bug($data='',$next=false){
    $res = self::getJSON($data);
    print_r($data);
    if($next==false) self::error($res);
  }

  /* 异常错误 */
  static protected function error($msg){
    self::getJSON();
    throw new \InvalidArgumentException($msg);
  }
  
}