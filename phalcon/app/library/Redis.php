<?php
namespace app\library;

use app\Env;

/* 缓存数据库 */
class Redis {

  /* 启动 */
  static function run() {
    $conf = Env::redis();
    $redis = new \Redis();
    $redis->connect($conf['host'],$conf['port']);
    if($conf['password']) $redis->auth($conf['password']);
    $redis->select($conf['db']);
    return $redis;
  }
  
}
