package webmis.library;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import webmis.service.Base;

/* 缓存数据库 */
public class Redis extends Base {

  public static JedisPool RedisDB = null;       //默认池
  public static JedisPool RedisDBOther = null;  //其它池

  // 属性
  private String _db = "";
  private Jedis _conn = null;

  /* 构造函数 */
  public Redis(String db) {
    _db = db;
    RedisConn();
  }

  /* 连接池 */
  public JedisPool RedisPool() {
    HashMap<String, Object> cfg;
    // 配置
    if(_db.equals("other")) cfg=webmis.config.Redis.Other();
    else cfg=webmis.config.Redis.Default();
    // 连接
    JedisPoolConfig config = new JedisPoolConfig();
    config.setMaxIdle(Integer.valueOf(cfg.get("min").toString()));
    config.setMaxTotal(Integer.valueOf(cfg.get("max").toString()));
    JedisPool pool = new JedisPool(config, cfg.get("host").toString(), Integer.valueOf(cfg.get("port").toString()));
    return pool;
  }

  /* 连接 */
  public void RedisConn() {
    HashMap<String, Object> cfg;
    if(_db.equals("other")) {
      if(Redis.RedisDBOther==null) Redis.RedisDBOther=RedisPool();
      _conn = Redis.RedisDBOther.getResource();
      cfg=webmis.config.Redis.Other();
    } else {
      if(Redis.RedisDB==null) Redis.RedisDB=RedisPool();
      _conn = Redis.RedisDB.getResource();
      cfg=webmis.config.Redis.Default();
    }
    // 密码
    String passwd = cfg.get("password").toString();
    if(!passwd.isEmpty()) _conn.auth(passwd);
    // 硬盘
    _conn.select(Integer.valueOf(cfg.get("db").toString()));
  }

  /* 实例 */
  public Jedis Conn() {
    return _conn;
  }

  /* 关闭 */
  public void Close() {
    if(_conn!=null && _conn.isConnected()) _conn.close();
  }

  /* 添加 */
  public String Set(String key, String val) {
    return _conn.set(key, val);
  }
  /* 获取 */
  public String Get(String key) {
    return _conn.get(key);
  }
  /* 删除 */
  public Long Del(String... key) {
    return _conn.del(key);
  }
  /* 是否存在 */
  public Boolean Exist(String key) {
    return _conn.exists(key);
  }
  /* 设置过期时间(秒) */
  public Long Expire(String key, int ttl) {
    return _conn.expire(key, ttl);
  }
  /* 获取过期时间(秒) */
  public Long Ttl(String key) {
    return _conn.ttl(key);
  }
  /* 获取长度 */
  public Long StrLen(String key) {
    return _conn.strlen(key);
  }

  /* 哈希(Hash)-添加 */
  public Long HSet(String name, String key, String val) {
    return _conn.hset(name, key, val);
  }
  public String HMSet(String name, Map<String, String> obj) {
    return _conn.hmset(name, obj);
  }
  /* 哈希(Hash)-获取 */
  public String HGet(String name, String key) {
    return _conn.hget(name, key);
  }
  public List<String> HMGet(String name, String... key) {
    return _conn.hmget(name, key);
  }
  /* 哈希(Hash)-删除 */
  public Long HDel(String name, String... key) {
    return _conn.hdel(name, key);
  }
  /* 哈希(Hash)-是否存在 */
  public Boolean HExist(String name, String key) {
    return _conn.hexists(name, key);
  }
  /* 哈希(Hash)-Key个数 */
  public Long HLen(String name) {
    return _conn.hlen(name);
  }

  /* 列表(List)-写入 */
  public Long RPush(String key, String... val) {
    return _conn.rpush(key, val);
  }
  public Long LPush(String key, String... val) {
    return _conn.lpush(key, val);
  }

  /* 列表(List)-读取 */
  public List<String> BRPop(String key, int timeout) {
    return _conn.brpop(timeout, key);
  }
  public List<String> BLPop(String key, int timeout) {
    return _conn.blpop(timeout, key);
  }

}
