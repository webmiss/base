<?php
namespace Util;

class Base64 {

  /* 加密 */
  static function Encode(string $str): string {
    return base64_encode($str);
  }

  /* 解密 */
  static function Decode(string $base64) {
    return base64_decode($base64);
  }

  /* 加密(URL) */
  static function UrlEncode(string $str): string {
    static $replace = Array('+'=>'*', '/'=>'-', '='=>'_');
    $res = base64_encode($str);
    return str_replace(array_keys($replace), array_values($replace), $res);
  }

  /* 解密(URL) */
  static function UrlDecode(string $base64) {
    static $replace = Array('+'=>'*', '/'=>'-', '='=>'_');
    $res = str_replace(array_values($replace), array_keys($replace), $base64);
    return base64_decode($res);
  }

  /* 压缩 */
  static function Compress(string $content) {
    return gzcompress($content);
  }

  /* 解压 */
  static function UnCompress(string $content) {
    return gzuncompress($content);
  }

}