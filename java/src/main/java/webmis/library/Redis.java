package webmis.library;

import java.util.List;
import java.util.Map;

import redis.clients.jedis.Jedis;
import webmis.base.Base;

/* 缓存数据库 */
public class Redis extends Base {

  private static Jedis _conn = null;

  /* 连接 */
  public static Jedis Conn() {
    Jedis redis = new Jedis(webmis.config.Redis.host,webmis.config.Redis.port);
    try {
      redis.ping();
    } catch (Exception e) {
      Print("[Redis] Conn:", e.getMessage());
      return null;
    }
    // 配置
    if(!webmis.config.Redis.password.equals("")) redis.auth(webmis.config.Redis.password);
    redis.select(webmis.config.Redis.db);
    _conn = redis;
    return _conn;
  }

  /* 添加 */
  static public String Set(String key, String val) {
    if(Conn()==null) return null;
    return _conn.set(key, val);
  }
  /* 获取 */
  static public String Get(String key) {
    if(Conn()==null) return null;
    return _conn.get(key);
  }
  /* 删除 */
  static public Long Del(String... key) {
    if(Conn()==null) return null;
    return _conn.del(key);
  }
  /* 是否存在 */
  static public Boolean Exist(String key) {
    if(Conn()==null) return null;
    return _conn.exists(key);
  }
  /* 设置过期时间(秒) */
  static public Long Expire(String key, int ttl) {
    if(Conn()==null) return null;
    return _conn.expire(key, ttl);
  }
  /* 获取过期时间(秒) */
  static public Long Ttl(String key) {
    if(Conn()==null) return null;
    return _conn.ttl(key);
  }
  /* 获取长度 */
  static public Long StrLen(String key) {
    if(Conn()==null) return null;
    return _conn.strlen(key);
  }

  /* 哈希(Hash)-添加 */
  static public Long HSet(String name, String key, String val) {
    if(Conn()==null) return null;
    return _conn.hset(name, key, val);
  }
  static public String HMSet(String name, Map<String, String> obj) {
    if(Conn()==null) return null;
    return _conn.hmset(name, obj);
  }
  /* 哈希(Hash)-获取 */
  static public String HGet(String name, String key) {
    if(Conn()==null) return null;
    return _conn.hget(name, key);
  }
  static public List<String> HMGet(String name, String... key) {
    if(Conn()==null) return null;
    return _conn.hmget(name, key);
  }
  /* 哈希(Hash)-删除 */
  static public Long HDel(String name, String... key) {
    if(Conn()==null) return null;
    return _conn.hdel(name, key);
  }
  /* 哈希(Hash)-是否存在 */
  static public Boolean HExist(String name, String key) {
    if(Conn()==null) return null;
    return _conn.hexists(name, key);
  }
  /* 哈希(Hash)-Key个数 */
  static public Long HLen(String name) {
    if(Conn()==null) return null;
    return _conn.hlen(name);
  }
  
}
