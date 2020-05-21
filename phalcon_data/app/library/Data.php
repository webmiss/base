<?php

/**
* 数据类
*/

namespace app\library;

class Data{

  /* 分表算法 */
  static function getHashTable($table,$uid,$num=512) {
    return $table.'_'.sprintf('%03x',intval(sprintf('%u',crc32($uid)))%$num);
  }

}