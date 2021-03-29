<?php
namespace Service;

use Config\Env;

/* 数据类 */
class Data extends Base {

  /* 图片地址 */
  static function Img(string $img): string {
    return $img?Env::$base_url.$img:'';
  }

}