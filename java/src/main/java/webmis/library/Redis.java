package webmis.library;

import java.util.List;
import java.util.Map;

import redis.clients.jedis.Jedis;
import webmis.service.Base;

/* 缓存数据库 */
public class Redis extends Base {

  private Jedis _conn = null;

  /* 构造函数 */
  public Redis() {
    try {
      // 创建连接
      _conn = new Jedis(webmis.config.Redis.host,webmis.config.Redis.port);
      _conn.ping();
      if(!webmis.config.Redis.password.equals("")) _conn.auth(webmis.config.Redis.password);
      _conn.select(webmis.config.Redis.db);
    } catch (Exception e) {
      Print("[Redis] Conn:", e.getMessage());
    }
  }

  /* 连接 */
  public Jedis Conn() {
    return _conn;
  }

  /* 关闭 */
  public void Close() {
    if(_conn!=null && _conn.isConnected()) _conn.close();
  }

  /* 添加 */
  public String Set(String key, String val) {
    if(_conn==null) return null;
    return _conn.set(key, val);
  }
  /* 获取 */
  public String Get(String key) {
    if(_conn==null) return null;
    return _conn.get(key);
  }
  /* 删除 */
  public Long Del(String... key) {
    if(_conn==null) return null;
    return _conn.del(key);
  }
  /* 是否存在 */
  public Boolean Exist(String key) {
    if(_conn==null) return null;
    return _conn.exists(key);
  }
  /* 设置过期时间(秒) */
  public Long Expire(String key, int ttl) {
    if(_conn==null) return null;
    return _conn.expire(key, ttl);
  }
  /* 获取过期时间(秒) */
  public Long Ttl(String key) {
    if(_conn==null) return null;
    return _conn.ttl(key);
  }
  /* 获取长度 */
  public Long StrLen(String key) {
    if(_conn==null) return null;
    return _conn.strlen(key);
  }

  /* 哈希(Hash)-添加 */
  public Long HSet(String name, String key, String val) {
    if(_conn==null) return null;
    return _conn.hset(name, key, val);
  }
  public String HMSet(String name, Map<String, String> obj) {
    if(_conn==null) return null;
    return _conn.hmset(name, obj);
  }
  /* 哈希(Hash)-获取 */
  public String HGet(String name, String key) {
    if(_conn==null) return null;
    return _conn.hget(name, key);
  }
  public List<String> HMGet(String name, String... key) {
    if(_conn==null) return null;
    return _conn.hmget(name, key);
  }
  /* 哈希(Hash)-删除 */
  public Long HDel(String name, String... key) {
    if(_conn==null) return null;
    return _conn.hdel(name, key);
  }
  /* 哈希(Hash)-是否存在 */
  public Boolean HExist(String name, String key) {
    if(_conn==null) return null;
    return _conn.hexists(name, key);
  }
  /* 哈希(Hash)-Key个数 */
  public Long HLen(String name) {
    if(_conn==null) return null;
    return _conn.hlen(name);
  }
  
}
