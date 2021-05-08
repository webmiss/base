<?php
namespace Util;

class Base64 {

  /* 编码 */
  static function Encode(string $data): string {
    return base64_encode($data);
  }

  /* 解码 */
  static function Decode(string $data) {
    return base64_decode($data);
  }

  /* 编码(URL) */
  static function UrlEncode(string $data): string {
    // 编码
    $res = base64_encode($data);
    // 替换
    static $replace = Array('+'=>'*', '/'=>'-', '='=>'_');
    return str_replace(array_keys($replace), array_values($replace), $res);
  }

  /* 解码(URL) */
  static function UrlDecode(string $data) {
    // 替换
    static $replace = Array('+'=>'*', '/'=>'-', '='=>'_');
    $res = str_replace(array_values($replace), array_keys($replace), $data);
    // 解码
    return base64_decode($res);
  }

  /* 压缩 */
  static function Compress(string $data) {
    return gzcompress($data);
  }

  /* 解压 */
  static function UnCompress(string $data) {
    return gzuncompress($data);
  }

}