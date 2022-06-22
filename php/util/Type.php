<?php
namespace Util;

/* 类型转换 */
class Type {

  /* 转换: string、int、float */
  static function ToType(string $type, $val) {
    switch($type) {
      case 'string':
        return (string)$val;
      case 'int':
        return (int)$val;
      case 'float':
        return (float)$val;
      default :
        return $val;
    }
  }

  /* Interface 转 String */
  static function Strval($val): string {
    return (string)$val;
  }

}