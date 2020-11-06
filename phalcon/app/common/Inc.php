<?php
namespace app\common;

/* 公共类 */
class Inc{

  /* Post */
  static function curlPost($url='', $data=[], $type='', $header=[]){
    // 方式
    if($type=='json'){
      $header[] = 'Content-Type: application/json; charset=utf-8';
      $data = json_encode($data,JSON_UNESCAPED_UNICODE);
    }
    // Curl
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_HTTPHEADER,$header);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    $res = curl_exec($curl);
    curl_close($curl);
    return $type=='xml'?$res:json_decode($res);
  }

  

}