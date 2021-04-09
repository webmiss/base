<?php
namespace Service;

use Library\Redis;

/* 日志 */
class Logs extends Base {

  /* 访问日志 */
  static function Log($data) {
    $text = json_encode(['type'=>'log', 'data'=>$data]);
    self::Writer($text);
  }

  /* 信息日志 */
  static function Info($data) {
    $text = json_encode(['type'=>'info', 'data'=>$data]);
    self::Writer($text);
  }

  /* 操作日志 */
  static function Action($data) {
    $text = json_encode(['type'=>'action', 'data'=>$data]);
    self::Writer($text);
  }

  /* 错误日志 */
  static function Error($data) {
    $text = json_encode(['type'=>'error', 'data'=>$data]);
    self::Writer($text);
  }

  /* 发送 */
  static function Writer(string $text) {
    $redis = new Redis();
    $redis->RPush('logs', $text);
    $redis->Close();
  }

}