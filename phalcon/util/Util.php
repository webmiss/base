<?php
namespace Util;

use Service\Base;

/* 工具 */
class Util extends Base {

  /* 执行Linux命令 */
  static function Exec(string $cmd) {
    $res = shell_exec($cmd);
    return $res;
  }

  /* 长度 */
  static function Len($val): int {
    $res = 0;
    if(gettype($val)=='array') $res=count($val);
    elseif(gettype($val)=='string') $res=mb_strlen($val);
    return $res;
  }

  /* String To Timestamp */
  static function Strtotime(string $day): int {
    $t = strtotime(trim($day));
    return $t>0?$t:0;
  }

  /* Timestamp To GmtIso8601 */
  static function GmtISO8601(int $timestamp): string {
    $dtStr = date("c", $timestamp);
    $mydatetime = new \DateTime($dtStr);
    $expiration = $mydatetime->format(\DateTime::ISO8601);
    $pos = strpos($expiration, '+');
    $expiration = substr($expiration, 0, $pos);
    return $expiration.'Z';
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