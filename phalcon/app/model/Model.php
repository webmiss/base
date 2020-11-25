<?php

namespace app\model;

use Phalcon\Mvc\Model as PhalconModel;

class Model extends PhalconModel{

  static private $sql_reg = '/(?:\')|(?:--)|(\/\*(?:.|[\n\r])*?\*\/)|(\b(select|select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\b)/';
  
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

  /* 过滤-WHERE */
  static public function bindWhere($where='',$bind=[]){
    foreach($bind as $k=>$v){
      // 小写、匹配、替换
      $lower = strtolower($v);
      if(!preg_match(self::$sql_reg,$lower)){
        $where = preg_replace('/:'.$k.':/',$v,$where);
      }else{
        self::error('非法参数!');
      }
    }
    return $where;
  }

}