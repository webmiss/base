<?php

namespace app\library;

/* 百度AI */
class BaiduAi{

  static $url='https://openapi.baidu.com/';

  /* 获取签名 */
  static function getToken(){
    $config = require APP_PATH.'/config/env.php';
    $res = file_get_contents(self::$url.'oauth/2.0/token?grant_type=client_credentials&client_id='.$config['baidu_appKey'].'&client_secret='.$config['baidu_appSecret']);
    $data = json_decode($res);
    return isset($data->access_token)?$data->access_token:'';
  }
  
}