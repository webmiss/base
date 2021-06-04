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

  private String _db = "";                      //数据库
  private Jedis _conn = null;                   //连接

  /* 构造函数 */
  public Redis(String db) {
    _db = db;
    RedisConn();
  }

  /* 连接 */
  public Jedis RedisConn() {
    HashMap<String, Object> cfg;
    try {
      if(_db.equals("other")) {
        cfg=webmis.config.Redis.Other();
        if(Redis.RedisDBOther==null) Redis.RedisDBOther=RedisPool(cfg);
        _conn = Redis.RedisDBOther.getResource();
      } else {
        cfg=webmis.config.Redis.Default();
        if(Redis.RedisDB==null) Redis.RedisDB=RedisPool(cfg);
        _conn = Redis.RedisDB.getResource();
      }
      // 密码
      String passwd = cfg.get("password").toString();
      if(!passwd.isEmpty()) _conn.auth(passwd);
      // 硬盘
      _conn.select(Integer.valueOf(cfg.get("db").toString()));
      return _conn;
    } catch (Exception e) {
      Print("[Redis] Conn:", e.getMessage());
      return null;
    }
  }

  /* 关闭 */
  public void Close() {
    if(_conn!=null && _conn.isConnected()) _conn.close();
  }

  /* 连接池 */
  public JedisPool RedisPool(HashMap<String, Object> cfg) {
    try{
      JedisPoolConfig config = new JedisPoolConfig();
      config.setMaxIdle(Integer.valueOf(cfg.get("min").toString()));
      config.setMaxTotal(Integer.valueOf(cfg.get("max").toString()));
      JedisPool pool = new JedisPool(config, cfg.get("host").toString(), Integer.valueOf(cfg.get("port").toString()));
      return pool;
    } catch (Exception e) {
      Print("[Model] Pool:", e.getMessage());
      return null;
    }
  }

  /* 添加 */
  public String Set(String key, String val) {
    if(_conn==null) return "";
    return _conn.set(key, val);
  }
  /* 自增 */
  public Long Incr(String key) {
    if(_conn==null) return null;
    return _conn.incr(key);
  }
  /* 获取 */
  public String Get(String key) {
    if(_conn==null) return "";
    return _conn.get(key);
  }
  /* 删除 */
  public long Del(String... key) {
    if(_conn==null) return 0;
    return _conn.del(key);
  }
  /* 是否存在 */
  public boolean Exist(String key) {
    if(_conn==null) return false;
    return _conn.exists(key);
  }
  /* 设置过期时间(秒) */
  public long Expire(String key, int ttl) {
    if(_conn==null) return 0;
    return _conn.expire(key, ttl);
  }
  /* 获取过期时间(秒) */
  public long Ttl(String key) {
    if(_conn==null) return 0;
    return _conn.ttl(key);
  }
  /* 获取长度 */
  public long StrLen(String key) {
    if(_conn==null) return 0;
    return _conn.strlen(key);
  }

  /* 哈希(Hash)-添加 */
  public Long HSet(String name, String key, String val) {
    if(_conn==null) return null;
    return _conn.hset(name, key, val);
  }
  public String HMSet(String name, Map<String, String> obj) {
    if(_conn==null) return "";
    return _conn.hmset(name, obj);
  }
  /* 哈希(Hash)-获取 */
  public String HGet(String name, String key) {
    if(_conn==null) return "";
    return _conn.hget(name, key);
  }
  public List<String> HMGet(String name, String... key) {
    if(_conn==null) return null;
    return _conn.hmget(name, key);
  }
  /* 哈希(Hash)-删除 */
  public long HDel(String name, String... key) {
    if(_conn==null) return 0;
    return _conn.hdel(name, key);
  }
  /* 哈希(Hash)-是否存在 */
  public boolean HExist(String name, String key) {
    if(_conn==null) return false;
    return _conn.hexists(name, key);
  }
  /* 哈希(Hash)-Key个数 */
  public long HLen(String name) {
    if(_conn==null) return 0;
    return _conn.hlen(name);
  }

  /* 列表(List)-写入 */
  public long RPush(String key, String... val) {
    if(_conn==null) return 0;
    return _conn.rpush(key, val);
  }
  public long LPush(String key, String... val) {
    if(_conn==null) return 0;
    return _conn.lpush(key, val);
  }

  /* 列表(List)-读取 */
  public List<String> LRange(String key, int start, int end) {
    if(_conn==null) return null;
    return _conn.lrange(key, start, end);
  }
  public List<String> BRPop(String key, int timeout) {
    if(_conn==null) return null;
    return _conn.brpop(timeout, key);
  }
  public List<String> BLPop(String key, int timeout) {
    if(_conn==null) return null;
    return _conn.blpop(timeout, key);
  }

}
