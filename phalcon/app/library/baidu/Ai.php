<?php

namespace app\library\baidu;

/* 百度AI */
class Ai{

  /* 获取签名 */
  static function getToken(){
    $config = require APP_PATH.'/config/env.php';
    $res = file_get_contents('https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id='.$config['baidu_appKey'].'&client_secret='.$config['baidu_appSecret']);
    $data = json_decode($res);
    return isset($data->access_token)?$data->access_token:'';
  }
  
}