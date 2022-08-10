<?php
namespace Library;

use Service\Base;
use Config\Redis as Cfg;

/* 缓存数据库 */
class Redis extends Base {

  static $RedisDB = null;       //默认池
  static $RedisDBOther = null;  //其它池

  private $db = '';             //数据库
  private $conn = null;         //连接

  /* 构造函数 */
  function __construct(string $db='') {
    $this->db = $db;
    $this->RedisConn();
  }

  /* 连接 */
  function RedisConn() {
    if($this->db=='other'){
      if(!Redis::$RedisDBOther) Redis::$RedisDBOther=$this->RedisPool(Cfg::Other());
      $this->conn = self::$RedisDBOther;
    } else {
      if(!Redis::$RedisDB) Redis::$RedisDB=$this->RedisPool(Cfg::Default());
      $this->conn = self::$RedisDB;
    }
    return $this->conn;
  }

  /* 关闭 */
  function Close() {
    if($this->conn) $this->conn->close();
  }

  /* 数据池 */
  function RedisPool(array $cfg){
    try{
      $redis = new \Redis();
      $redis->pconnect($cfg['host'], $cfg['port']); 
      if($cfg['password']) $redis->auth($cfg['password']);
      $redis->select($cfg['db']);
      return $redis;
    }catch (\Exception $e){
      self::Print('[Redis] Conn: 请检测Redis是否启动!');
      return null;
    }
  }

  /* 添加 */
  function Set(string $key, string $val) {
    if(!$this->conn) return;
    return $this->conn->set($key, $val);
  }
  /* 自增 */
  function Incr(string $key) {
    if(!$this->conn) return;
    return $this->conn->incr($key);
  }
  /* 获取 */
  function Gets(string $key) {
    if(!$this->conn) return;
    return $this->conn->get($key);
  }
  /* 删除 */
  function Del(string ...$key) {
    if(!$this->conn) return;
    return $this->conn->del($key);
  }
  /* 是否存在 */
  function Exist(string $key) {
    if(!$this->conn) return;
    return $this->conn->exists($key);
  }
  /* 设置过期时间(秒) */
  function Expire(string $key, int $ttl) {
    if(!$this->conn) return;
    return $this->conn->expire($key, $ttl);
  }
  /* 获取过期时间(秒) */
  function Ttl(string $key) {
    if(!$this->conn) return;
    return $this->conn->ttl($key);
  }
  /* 获取长度 */
  function StrLen(string $key) {
    if(!$this->conn) return;
    return $this->conn->strlen($key);
  }

  /* 哈希(Hash)-添加 */
  function HSet(string $name, string $key, $val) {
    if(!$this->conn) return;
    return $this->conn->hset($name, $key, $val);
  }
  function HMSet(string $name, array $obj) {
    if(!$this->conn) return;
    return $this->conn->hmset($name, $obj);
  }
  /* 哈希(Hash)-获取 */
  function HGet(string $name, string $key) {
    if(!$this->conn) return;
    return $this->conn->hget($name, $key);
  }
  function HMGet(string $name, string $key) {
    return $this->conn->hmget($name, $key);
  }
  /* 哈希(Hash)-删除 */
  function HDel(string $name, string ...$key) {
    if(!$this->conn) return;
    return $this->conn->hdel($name, $key);
  }
  /* 哈希(Hash)-是否存在 */
  function HExist(string $name, string $key) {
    if(!$this->conn) return;
    return $this->conn->hexists($name, $key);
  }
  /* 哈希(Hash)-Key个数 */
  function HLen(string $name) {
    if(!$this->conn) return;
    return $this->conn->hlen($name);
  }

  /* 列表(List)-写入 */
  function RPush(string $key, $val) {
    if(!$this->conn) return;
    return $this->conn->rpush($key, $val);
  }
  function LPush(string $key, $val) {
    if(!$this->conn) return;
    return $this->conn->lpush($key, $val);
  }

  /* 列表(List)-读取 */
  function LRange($key, $start, $end): array {
    if(!$this->conn) return null;
    return $this->conn->lRange($key, $start, $end);
  }
  function RPop($key) {
    if(!$this->conn) return null;
    return $this->conn->rPop($key);
  }
  function LPop($key) {
    if(!$this->conn) return null;
    return $this->conn->lPop($key);
  }
  function BRPop($key, $timeout): array {
    if(!$this->conn) return null;
    return $this->conn->brPop($key, $timeout);
  }
  function BLPop($key, $timeout): array {
    if(!$this->conn) return null;
    return $this->conn->blPop($key, $timeout);
  }

}