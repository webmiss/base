<?php

namespace Base;

use Middleware\Cors;
use Error;

class Base {

  /* 返回JSON */
  static protected function GetJSON(array $data=[]): string {
    Cors::Init();
    return json_encode($data);
  }

  /* Get参数 */
  static protected function Get(string $name) {
    return isset($_GET[$name])?$_GET[$name]:'';
  }

  /* Post参数 */
  static protected function Post(string $name) {
    return isset($_POST[$name])?$_POST[$name]:'';
  }

  /* 输出到控制台 */
  static public function Print(...$content): void {
    foreach($content as $val){
      fwrite(STDERR,self::toString($val).' ');
    }
    fwrite(STDERR,PHP_EOL);
  }
  static private function toString($val): string {
    if(gettype($val)=='array') $val = json_encode($val, JSON_UNESCAPED_UNICODE);
    elseif(gettype($val)=='object') $val = json_encode($val, JSON_UNESCAPED_UNICODE);
    else $val = (string)$val;
    return $val;
  }

  /* 异常错误 */
  static protected function Error($msg) {
    throw new \InvalidArgumentException($msg);
  }
  
}