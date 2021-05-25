<?php
namespace Util;

/* 工具 */
class Util {

  /* String To Timestamp */
  static function Strtotime(string $day): int {
    $t = strtotime(trim($day));
    return $t>0?$t:0;
  }

  /* Array to String */
  static function JsonEncode($arr): string {
    $res = json_encode($arr);
    return $res?$res:'';
  }

  /* String to Array */
  static function JsonDecode($arr): array {
    $res = json_decode($arr, true);
    return $res?$res:[];
  }

  /* Url to Array */
  static function UrlToArray(string $url): array {
    if(empty($url)) return [];
    $arr = explode('?',$url);
    $url = count($arr)>1?$arr[1]:$arr[0];
    // 参数
    $data = [];
    $arr = explode('&',$url);
    foreach($arr as $v1){
      $tmp = explode('=',$v1);
      $data[$tmp[0]] = trim($tmp[1]);
    }
    return $data;
  }

}