<?php

namespace app\common;

use Phalcon\Mvc\Controller;
use app\config\Cors;

class Base extends Controller{

  /* 构造函数 */
  function initialize(){
    // 允许跨域请求
    $m = $this->dispatcher->getModuleName();
    $arr = Cors::corsAllowe();
    if(in_array($m,$arr)){
      header('Access-Control-Allow-Origin:*');
      header('Access-Control-Allow-Methods:*');
      header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    }
  }
    
  /* 返回JSON */
  static protected function getJSON($data=''){
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
    throw new \InvalidArgumentException($msg);
  }
  
}