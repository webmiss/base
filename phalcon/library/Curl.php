<?php
namespace Library;

use Service\Base;

/* 请求 */
class Curl extends Base {

  /* GET、POST、PUT、HEAD、DELETE */
  static function Request(string $url, string $data='', string $method='GET', array $headers=[], string $resType='json') {
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
    if($resType=='json') $res = !empty($text)?json_decode($text):null;
    else $res = $text;
    return $res;
  }

  /* URL参数-生成 */
  static function UrlEncode(array $data): string {
    return http_build_query($data);
  }
  /* URL参数-解析 */
  static function UrlDecode(string $data): array {
    $res = [];
    $arr = explode('&', $data);
    foreach($arr as $v){
      $tmp = explode('=', $v);
      if($tmp[1]) $res[$tmp[0]]=urldecode($tmp[1]);
    }
    return $res;
  }

}