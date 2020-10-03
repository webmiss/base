package vip.webmis.java.library;

import java.util.HashMap;

import redis.clients.jedis.Jedis;
import vip.webmis.java.Env;

/* 缓存数据库 */
public class Redis {

  /* 启动 */
  public static Jedis run() {
    HashMap<String,Object> conf = Env.redis();
    String host = (String) conf.get("host");
    int port = (int) conf.get("port");
    String password = (String) conf.get("password");
    int db = (int) conf.get("db");
    Jedis redis = new Jedis(host,port);
    if(password!="") redis.auth(password);
    redis.select(db);
    return redis;
  }
  
}
