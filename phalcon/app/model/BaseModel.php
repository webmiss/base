<?php

namespace app\model;

use Phalcon\Mvc\Model;

class BaseModel extends Model{

  /* 返回JSON */
  static protected function getJSON($data=''){
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    return json_encode($data);
  }

  /* 调试信息 */
  static protected function bug($data='',$next=false){
    self::getJSON();
    printf("%s",$data);
    if($next==false) self::error("%s",$data);
  }

  /* 异常错误 */
  static protected function error($msg){
    self::getJSON();
    throw new \InvalidArgumentException($msg);
  }

}