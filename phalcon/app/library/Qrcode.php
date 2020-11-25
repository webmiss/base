<?php

/**
* 二维码类
* 请安装qrencode、zbar
*/

namespace app\library;

class Qrcode{

  /* 二维码-生成 */
  static function create($text='',$size='8',$tmpPath='upload/tmp/'){
    // 创建目录
    if (!file_exists($tmpPath)) mkdir($tmpPath,0777,true);
    // 文件名
    $file = $tmpPath.self::_getName().'.png';
    exec('qrencode -o '.$file.' -s '.$size.' -m 1 "'.$text.'" &');
    // 内容
    $ct = file_get_contents($file);
    // 清理
    unlink($file);
    return $ct;
  }

  /* 二维码-识别 */
  static function scan($file=''){
    // 处理
    $url = shell_exec('zbarimg -q '.$file);
    $url = ltrim($url,'QR-Code:');
    $url = rtrim($url,"\n");
    return $url;
  }

  /* 获取名称 */
  static private function _getName(){
    list($msec, $sec) = explode(' ', microtime());
    return date('YmdHis').substr($msec,2,4);
  }

}