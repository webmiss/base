<?php
namespace Service;

use Config\Env;

/* 数据类 */
class Data extends Base {

  /* 生成ID */
  static function GetId() {
    // $time = floor(microtime(true) * 1000);
    // // 0bit 未使用
    // $suffix = 0;
    // // 41bit 时间戳
    // $base = decbin(pow(2,40) - 1 + $time);
    // // 10bit 设备ID
    // $machineid = decbin(pow(2,9) - 1 + Env::$machine_id);
    // // 12bit 毫秒序号
    // $random = mt_rand(1, pow(2,11)-1);
    // $random = decbin(pow(2,11)-1 + $random);
    // // 64bit
    // $base64 = $suffix.$base.$machineid.$random;
    // self::Print($base64);
    // $id = sprintf('%.0f', bindec($base64));
    return '2021';
  }

  /* 图片地址 */
  static function Img(string $img): string {
    return $img?Env::$base_url.$img:'';
  }

}