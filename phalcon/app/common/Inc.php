<?php
namespace app\common;

/* 公共类 */
class Inc{

  /* Curl-Post */
  static function curlPost($param=[]){
    // 参数
    $param = array_merge([
      'url'=>'',  //请求地址
      'data'=>[],  //请求数据
      'header'=>[], //Header头信息
      'type'=>'',  //返回类型: '','json','xml'
    ],$param);
    // 方式
    if($param['type']=='json'){
      $header[] = 'Content-Type: application/json; charset=utf-8';
      $data = json_encode($param['data'],JSON_UNESCAPED_UNICODE);
    }
    // Curl
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_HTTPHEADER,$header);
    curl_setopt($curl, CURLOPT_URL, $param['url']);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    $res = curl_exec($curl);
    curl_close($curl);
    return $param['type']=='xml'?$res:json_decode($res);
  }

}