<?php
namespace Library;

use Service\Base;
use Config\Redis as Cfg;

/* 缓存数据库 */
class Redis extends Base {

  private $db = '';
  private $conn = null;

  /* 构造函数 */
  function __construct(string $db='') {
    $this->db = $db;
    $this->RedisPool();
  }

  /* 连接池 */
  function RedisPool() {
    // 配置
    if($this->db=='Other') $cfg=Cfg::Other();
    else $cfg=Cfg::Default();
    // 连接
    try{
      $this->conn = new \Redis();
      $this->conn->pconnect($cfg['host'], $cfg['port']); 
      if($cfg['password']) $this->conn->auth($cfg['password']);
      $this->conn->select($cfg['db']);
    }catch (\Exception $e){
      self::Print('[Redis] Conn: 请检测Redis是否启动!');
    }
  }

  /* 实例 */
  function Conn() {
    return $this->conn;
  }

  /* 是否连接 */
  function IsConn(): void {
    if(!$this->conn->ping()) $this->RedisPool();
  }

  /* 关闭 */
  function Close() {
    if($this->conn) $this->conn->close();
  }

  /* 添加 */
  function Set(string $key, string $val) {
    $this->IsConn();
    return $this->conn->set($key, $val);
  }
  /* 获取 */
  function Gets(string $key) {
    $this->IsConn();
    return $this->conn->get($key);
  }
  /* 删除 */
  function Del(string ...$key) {
    $this->IsConn();
    return $this->conn->del($key);
  }
  /* 是否存在 */
  function Exist(string $key) {
    $this->IsConn();
    return $this->conn->exists($key);
  }
  /* 设置过期时间(秒) */
  function Expire(string $key, int $ttl) {
    $this->IsConn();
    return $this->conn->expire($key, $ttl);
  }
  /* 获取过期时间(秒) */
  function Ttl(string $key) {
    $this->IsConn();
    return $this->conn->ttl($key);
  }
  /* 获取长度 */
  function StrLen(string $key) {
    $this->IsConn();
    return $this->conn->strlen($key);
  }

  /* 哈希(Hash)-添加 */
  function HSet(string $name, string $key, $val) {
    $this->IsConn();
    return $this->conn->hset($name, $key, $val);
  }
  function HMSet(string $name, array $obj) {
    $this->IsConn();
    return $this->conn->hmset($name, $obj);
  }
  /* 哈希(Hash)-获取 */
  function HGet(string $name, string $key) {
    $this->IsConn();
    return $this->conn->hget($name, $key);
  }
  function HMGet(string $name, string $key) {
    $this->IsConn();
    return $this->conn->hmget($name, $key);
  }
  /* 哈希(Hash)-删除 */
  function HDel(string $name, string ...$key) {
    $this->IsConn();
    return $this->conn->hdel($name, $key);
  }
  /* 哈希(Hash)-是否存在 */
  function HExist(string $name, string $key) {
    $this->IsConn();
    return $this->conn->hexists($name, $key);
  }
  /* 哈希(Hash)-Key个数 */
  function HLen(string $name) {
    $this->IsConn();
    return $this->conn->hlen($name);
  }

  /* 列表(List)-写入 */
  function RPush(string $key, $val) {
    $this->IsConn();
    return $this->conn->rpush($key, $val);
  }
  function LPush(string $key, $val) {
    $this->IsConn();
    return $this->conn->lpush($key, $val);
  }

  /* 列表(List)-读取 */
  function BRPop($key, $timeout): array {
    $this->IsConn();
    return $this->conn->brPop($key, $timeout);
  }
  function BLPop($key, $timeout): array {
    $this->IsConn();
    return $this->conn->blPop($key, $timeout);
  }

}