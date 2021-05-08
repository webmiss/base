<?php
namespace Util;

/* 加密 */
class Hmac {

  /* Md5 */
  static function Md5(string $data): string {
    return md5($data);
  }

  /* Sha256 */
  static function Sha256(string $data, string $key): string {
    $res = hash_hmac('sha256', $data, $key, true);
    return $res!==false?$res:'';
  }

}