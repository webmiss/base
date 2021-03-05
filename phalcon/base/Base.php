<?php

namespace base;

use Config\Cors;

class Base {
    
  /* 返回JSON */
  static protected function getJSON($data=''){
    Cors::Init();
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

  /* 输出到控制台 */
  static public function print($val0,$val1=null,$val2=null,$val3=null){
    define('STDERR',fopen('php://stderr', 'a'));
    fwrite(STDERR,self::toString($val0));
    if($val1) fwrite(STDERR,' '.self::toString($val1).' ');
    if($val2) fwrite(STDERR,' '.self::toString($val2).' ');
    if($val3) fwrite(STDERR,' '.self::toString($val3).' ');
    fwrite(STDERR,PHP_EOL);
  }
  static private function toString($val): string {
    if(gettype($val)=='array') $val = json_encode($val);
    elseif(gettype($val)=='object') $val = json_encode($val);
    else $val = (string)$val;
    return $val;
  }
  
}