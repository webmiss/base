<?php

namespace base;

use Config\Cors;

class Base {

  /* 输出到控制台 */
  static public function Print(...$content): void {
    foreach($content as $val){
      fwrite(STDERR,self::toString($val).' ');
    }
    fwrite(STDERR,PHP_EOL);
  }
  static private function toString($val): string {
    if(gettype($val)=='array') $val = json_encode($val);
    elseif(gettype($val)=='object') $val = json_encode($val);
    else $val = (string)$val;
    return $val;
  }
    
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
  
}