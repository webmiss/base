<?php
namespace Util;

/* 哈希 */
class Hash {

  /* Md5 */
  static function Md5(string $data, $binary=true): string {
    return md5($data, $binary);
  }

  /* Sha256 */
  static function Sha256(string $data): string {
    $res = hash('SHA256', $data);
    return $res!==false?$res:'';
  }

  /* HmacSha1 */
  static function HmacSha1(string $data, string $key, bool $binary=true): string {
    $res = hash_hmac('sha1', $data, $key, $binary);
    return $res!==false?$res:'';
  }

  /* HmacSha256 */
  static function HmacSha256(string $data, string $key, bool $binary=true): string {
    $res = hash_hmac('sha256', $data, $key, $binary);
    return $res!==false?$res:'';
  }

  /* GetBytes */
  static function GetBytes(string $data): array {
    $bytes = [];
    for($i = 0; $i < strlen($data); $i++){
      $bytes[] = ord($data[$i]);
    }
    return $bytes;
  }

}