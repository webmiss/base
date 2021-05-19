<?php
namespace Library;

use Service\Base;

/* 请求 */
class Curl extends Base {

  /* PostJson */
  static function PostJson(string $url, array $data=[]) {
    // 数据
    $json = !empty($data)?json_encode($data):'{}';
    // 发送
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
    $res = curl_exec($curl);
    curl_close($curl);
    return !empty($res)?json_decode($res):null;
  }

}