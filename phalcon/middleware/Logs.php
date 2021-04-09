<?php
namespace Middleware;

use Service\Base;
use Service\Logs as LogsService;

/* 日志 */
class Logs extends Base {

  /* 访问日志 */
  static function Init() {
    LogsService::Log([
      'ip'=> $_SERVER['REMOTE_ADDR'],
      'method'=> $_SERVER['REQUEST_METHOD'],
      'path'=> $_SERVER['REQUEST_URI'],
      'user_agent'=> $_SERVER['HTTP_USER_AGENT'],
      'time'=> microtime(true),
    ]);
  }

}