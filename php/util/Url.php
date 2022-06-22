<?php
namespace Util;

class Url {

  /* 编码 */
  static function Encode(string $data): string {
    return urlencode($data);
  }

  /* 解码 */
  static function Decode(string $data): string {
    return urldecode($data);
  }

}