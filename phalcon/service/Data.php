<?php
namespace Service;

use Config\Env;
use Library\Redis;

/* 数据类 */
class Data extends Base {

  static $id = 0;           //自增ID
  static $idShift = 16;     //自增数位数
  static $saltShift = 8;    //随机数移位
  static $saltBit = 8;      //随机数位数

  /* 生成ID */
  static function GetId(string $name) {
    // 获取
    $redis = new Redis();
    Data::$id = floor($redis->Gets($name));
    Data::$id++;
    // 随机数
    $randA = mt_rand(0, 255);
    $randB = mt_rand(0, 255);
    // 位运算
    $mist = floor((Data::$id << Data::$idShift) | ($randA << Data::$saltShift) | $randB);
    // 保存
    $redis->Set($name, Data::$id);
    $redis->Close();
    return $mist;
  }

  /* 图片地址 */
  static function Img(string $img): string {
    return $img?Env::$base_url.$img:'';
  }

}