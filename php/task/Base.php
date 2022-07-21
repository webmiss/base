<?php
namespace Task;

/* Cli */
class Base {

  /* 输出到控制台 */
  static function Print(...$content): void {
    foreach($content as $val){
      echo json_encode($val, JSON_UNESCAPED_UNICODE);
    }
  }

  /* 异常错误 */
  static function Error($msg) {
    throw new \InvalidArgumentException($msg);
  }

}