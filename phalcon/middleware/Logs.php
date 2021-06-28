<?php
namespace Middleware;

use Config\Env;
use Service\Base;
use Service\Logs as LogsService;

/* 日志 */
class Logs extends Base {

  /* 访问日志 */
  static function Init() {
    // 参数
    $ip = $_SERVER['REMOTE_ADDR'];
    $method = $_SERVER['REQUEST_METHOD'];
    $path = $_SERVER['REQUEST_URI'];
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    // 写入-数据库
    if(Env::$log_db) {
      LogsService::LogsDB($ip, $method, $path, $user_agent);
    }
    // 写入-文件
    if(Env::$log_file) {
      LogsService::Log([
        'ip'=> $ip,
        'method'=> $_SERVER['REQUEST_METHOD'],
        'path'=> $_SERVER['REQUEST_URI'],
        'user_agent'=> $user_agent,
        'time'=> microtime(true),
      ]);
    }
  }

}