<?php
namespace Service;

use Config\Env;
use Library\Redis;

/* 数据类 */
class Data extends Base {

  const max8bit = 8;      //随机数位数
  const max10bit = 10;    //机器位数
  const max12bit = 12;    //序列数位数
  

  /* 薄雾算法 */
  static function Mist(string $redisName) {
    // 自增ID
    $redis = new Redis();
    $autoId = $redis->Incr($redisName);
    $redis->Close();
    // 随机数
    $randA = mt_rand(0, 255);
    $randB = mt_rand(0, 255);
    // 位运算
    $mist = decbin(($autoId << (self::max8bit + self::max8bit)) | ($randA << self::max8bit) | $randB);
    return bindec($mist);
  }

  /* 雪花算法 */
  static function Snowflake() {
    // 时间戳
    $t = floor(microtime(true) * 1000);
    // 随机数
    $rand = mt_rand(0, 4095);
    // 位运算
    $mist = decbin(($t << (self::max10bit + self::max12bit)) | (Env::$machine_id << self::max12bit) | $rand);
    return bindec($mist);
  }

  /* 图片地址 */
  static function Img(string $img): string {
    return $img?Env::$base_url.$img:'';
  }

}