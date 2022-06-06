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

  /* 格式化时间 */
  static function Date(string $format='Y-m-d H:i:s', int $timestamp=0) {
    return date($format, $timestamp);
  }
  static function DateFormat(string $format='Y-m-d H:i:s', string $duration='0s'): string {
    $l = substr($duration, 0, -1);
    $r = substr($duration, -1);
    # 年、月、周、日、时、分、秒
    $res = '';
    if($r=='y') $res = date($format, strtotime($l.' year'));
    elseif($r=='m') $res = date($format, strtotime($l.' month'));
    elseif($r=='w') $res = date($format, strtotime($l.' week'));
    elseif($r=='d') $res = date($format, strtotime($l.' day'));
    elseif($r=='h') $res = date($format, strtotime($l.' hour'));
    elseif($r=='i') $res = date($format, strtotime($l.' minute'));
    elseif($r=='s') $res = date($format, strtotime($l.' second'));
    else $res = date($format);
    return $res;
  }

  /* String To Timestamp */
  static function StrToTime(string $day): int {
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
  static function JsonEncode(array $json): string {
    $res = json_encode($json);
    return $res?$res:'';
  }

  /* String to Array */
  static function JsonDecode(string $json): array {
    $res = json_decode($json, true);
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