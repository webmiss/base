package webmis.service;

import java.util.HashMap;

import webmis.base.Base;
import webmis.config.Env;
import webmis.library.Redis;
import webmis.library.Safety;
import webmis.util.Util;

/* 后台Token */
public class AdminToken extends Base {

  /* 生成 */
  public static String create(HashMap<String, Object> data) {
    data.put("l_time", Util.date("yyyy-MM-dd HH:mm:ss"));
    String token = Safety.encode(data);
    // 缓存
    String key = Env.admin_token_prefix+String.valueOf(data.get("uid"));
    Redis.Set(key, "1");
    Redis.Expire(key, Env.admin_token_time);
    return token;
  }
  
}
