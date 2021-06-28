<?php
namespace Service;

use Config\Env;
use Library\Redis;
use Util\Os;
use Model\Logs as LogsModel;

/* 日志 */
class Logs extends Base {

  /* 写入数据库 */
  static function LogsDB(string $ip, string $method, string $path, string $user_agent) {
    // 数据
    $os = Os::System($user_agent);
    $browser = Os::Browser($user_agent);
    $time = time();
    // 模型
    $model = new LogsModel();
    $model->Values([
      'source'=> Env::$log_source,
      'ip'=> $ip,
      'os'=> $os,
      'browser'=> $browser,
      'ctime'=> $time,
      'method'=> $method,
      'url'=> $path,
      'user_agent'=> $user_agent,
    ]);
    $model->Insert();
  }

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