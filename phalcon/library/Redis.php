<?php
namespace Library;

use Service\Base;
use Config\Redis as Cfg;

/* 缓存数据库 */
class Redis extends Base {

  private $conn = null;

  /* 构造函数 */
  function __construct() {
    try{
      $this->conn = new \Redis();
      $this->conn->pconnect(Cfg::$host, Cfg::$port); 
      if(Cfg::$password) $this->conn->auth(Cfg::$password);
      $this->conn->select(Cfg::$db);
    }catch (\Exception $e){
      $msg = '[Redis] Conn: 请检测Redis是否启动!';
      self::Print($msg);
    }
  }

  /* 连接 */
  function Conn() {
    return $this->conn;
  }

  /* 关闭 */
  function Close() {
    if($this->conn) $this->conn->close();
  }

  /* 添加 */
  function Set(string $key, string $val) {
    if(!$this->conn) return null;
    return $this->conn->set($key, $val);
  }
  /* 获取 */
  function Gets(string $key) {
    if(!$this->conn) return null;
    return $this->conn->get($key);
  }
  /* 删除 */
  function Del(string ...$key) {
    if(!$this->conn) return null;
    return $this->conn->del($key);
  }
  /* 是否存在 */
  function Exist(string $key) {
    if(!$this->conn) return null;
    return $this->conn->exists($key);
  }
  /* 设置过期时间(秒) */
  function Expire(string $key, int $ttl) {
    if(!$this->conn) return null;
    return $this->conn->expire($key, $ttl);
  }
  /* 获取过期时间(秒) */
  function Ttl(string $key) {
    if(!$this->conn) return null;
    return $this->conn->ttl($key);
  }
  /* 获取长度 */
  function StrLen(string $key) {
    if(!$this->conn) return null;
    return $this->conn->strlen($key);
  }

  /* 哈希(Hash)-添加 */
  function HSet(string $name, string $key, $val) {
    if(!$this->conn) return null;
    return $this->conn->hset($name, $key, $val);
  }
  function HMSet(string $name, array $obj) {
    if(!$this->conn) return null;
    return $this->conn->hmset($name, $obj);
  }
  /* 哈希(Hash)-获取 */
  function HGet(string $name, string $key) {
    if(!$this->conn) return null;
    return $this->conn->hget($name, $key);
  }
  function HMGet(string $name, string $key) {
    if(!$this->conn) return null;
    return $this->conn->hmget($name, $key);
  }
  /* 哈希(Hash)-删除 */
  function HDel(string $name, string ...$key) {
    if(!$this->conn) return null;
    return $this->conn->hdel($name, $key);
  }
  /* 哈希(Hash)-是否存在 */
  function HExist(string $name, string $key) {
    if(!$this->conn) return null;
    return $this->conn->hexists($name, $key);
  }
  /* 哈希(Hash)-Key个数 */
  function HLen(string $name) {
    if(!$this->conn) return null;
    return $this->conn->hlen($name);
  }

}