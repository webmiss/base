<?php
namespace Library;

use Service\Base;

class Captcha extends Base {

  static private $txtChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  /* 验证码 */
  static function Vcode() {
    $code = self::GetCode(4);
    self::Print($code, strtolower($code));
  }

  /* 获取号码 */
  static function GetCode(int $num): string {
    $code = '';
    for($i=0; $i<$num; $i++){
      $code .= substr(self::$txtChars,rand(0, strlen(self::$txtChars)-1), 1);
    }
    return $code;
  }

}