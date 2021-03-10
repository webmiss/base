<?php
namespace Library;

use Base\Base;
use Config\Redis as Cfg;

/* 缓存数据库 */
class Redis extends Base {

  private static $conn = null;          //连接

  /* 连接 */
  static function Conn() {
    $redis = new \Redis();
    try{
      $redis->pconnect(Cfg::$host, Cfg::$port); 
      if(Cfg::$password) $redis->auth(Cfg::$password);
      $redis->select(Cfg::$db);
      self::$conn = $redis;
    }catch (\Exception $e){
      self::Print('[Redis] Conn: 请检测Redis是否启动!');
    }
    return self::$conn;
  }

  /* 添加 */
  static function Set(string $key, string $val): void {
    if(!self::Conn()) return;
    self::$conn->set($key, $val);
  }
  /* 获取 */
  static function Get(string $key) {
    if(!self::Conn()) return ;
    return self::$conn->get($key);
  }
  /* 删除 */
  static function Del(string ...$key): void {
    if(!self::Conn()) return ;
    self::$conn->del($key);
  }
  /* 是否存在 */
  static function Exist(string $key) {
    if(!self::Conn()) return false;
    return self::$conn->exists($key);
  }
  /* 设置过期时间(秒) */
  static function Expire(string $key, int $ttl) {
    if(!self::Conn()) return false;
    self::$conn->expire($key, $ttl);
  }
  /* 获取过期时间(秒) */
  static function Ttl(string $key) {
    if(!self::Conn()) return false;
    return self::$conn->ttl($key);
  }
  /* 获取长度 */
  static function StrLen(string $key) {
    if(!self::Conn()) return false;
    return self::$conn->strlen($key);
  }

  /* 哈希(Hash)-添加 */
  static function HSet(string $name, string $key, $val) {
    if(!self::Conn()) return false;
    self::$conn->hset($name, $key, $val);
  }
  static function HMSet(string $name, array $obj) {
    if(!self::Conn()) return false;
    self::$conn->hmset($name, $obj);
  }
  /* 哈希(Hash)-获取 */
  static function HGet(string $name, string $key) {
    if(!self::Conn()) return false;
    self::$conn->hget($name, $key);
  }
  static function HMget(string $name, string $key) {
    if(!self::Conn()) return false;
    self::$conn->hmget($name, $key);
  }
  /* 哈希(Hash)-删除 */
  static function Hdel(string $name, string $key) {
    if(!self::Conn()) return false;
    self::$conn->hdel($name, $key);
  }
  /* 哈希(Hash)-是否存在 */
  static function HExist(string $name, string $key) {
    if(!self::Conn()) return false;
    self::$conn->hexists($name, $key);
  }
  /* 哈希(Hash)-Key个数 */
  static function HLen(string $name) {
    if(!self::Conn()) return false;
    self::$conn->hlen($name);
  }

}