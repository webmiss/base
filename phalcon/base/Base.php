<?php

namespace base;

use Config\Cors;

class Base {

  /* 返回JSON */
  static protected function GetJSON($data=''){
    Cors::Init();
    return json_encode($data);
  }

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

  /* 异常错误 */
  static protected function Error($msg){
    throw new \InvalidArgumentException($msg);
  }
  
}