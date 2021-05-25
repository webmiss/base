<?php
namespace Library;

use Service\Base;

/* 请求 */
class Curl extends Base {

  /* GET、POST、PUT、HEAD、DELETE */
  static function Request(string $method='GET', string $url, string $data, array $headers=[], string $resType='json') {
    // 请求头
    $headerArr = [];
    foreach($headers as $k=>$v){
      $headerArr[] = $k.': '.$v;
    }
    // 发送
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headerArr);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // 数据
    if($method!='GET'){
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }
    $text = curl_exec($ch);
    curl_close($ch);
    // 结果
    if($resType=='json') {
      $res = !empty($text)?json_decode($text):null;
    } elseif ($resType=='xml'){
      $res = $text;
    } else {
      $res = $text;
    }
    return $res;
  }

}