<?php
namespace app\library;

use app\Env;

/* 百度AI */
class BaiduAi{

  static $url='https://openapi.baidu.com/';

  /* 获取签名 */
  static function getToken(){
    $config = Env::baidu();
    $res = file_get_contents(self::$url.'oauth/2.0/token?grant_type=client_credentials&client_id='.$config['appKey'].'&client_secret='.$config['appSecret']);
    $data = json_decode($res);
    return isset($data->access_token)?$data->access_token:'';
  }
  
}