<?php
namespace app\library;

use app\common\Base;
use app\Env;

/* 缓存数据库 */
class Redis extends Base {

  /* 启动 */
  static function run() {
    $conf = Env::redis();
    $redis = new \Redis();
    try{
      $redis->pconnect($conf['host'],$conf['port']); 
      if($conf['password']) $redis->auth($conf['password']);
      $redis->select($conf['db']);
      return $redis;
    }catch (\Exception $e){
      self::error('请检测Redis是否启动!');
    }
  }
  
}
