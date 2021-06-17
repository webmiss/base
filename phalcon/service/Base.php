<?php
namespace Service;

class Base {

  /* 返回JSON */
  static function GetJSON(array $data=[]): string {
    return json_encode($data);
  }

  /* Get参数 */
  static function Get(string $name) {
    return isset($_GET[$name])?$_GET[$name]:'';
  }

  /* Post参数 */
  static function Post(string $name) {
    return isset($_POST[$name])?$_POST[$name]:'';
  }

  /* JSON参数 */
  static function Json() {
    return json_decode(file_get_contents('php://input'), true);
  }

  /* 临时日志文件 */
  static function TmpLogs(string $text) {
    exec('echo '.$text.' > upload/logs.txt');
  }

  /* 输出到控制台 */
  static function Print(...$content): void {
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
  static function Error($msg) {
    throw new \InvalidArgumentException($msg);
  }
  
}