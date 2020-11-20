package vip.webmis.java.common;

import java.util.HashMap;

import vip.webmis.java.Env;
import vip.webmis.java.library.Redis;
import vip.webmis.java.library.Safety;

public class ApiToken extends Base {

  /* 验证&数据 */
  public static HashMap<String, Object> verify(String token) throws Exception {
    // 验证Token
    HashMap<String, Object> res = Safety.decode(token);
    if(res==null || res.isEmpty()) error("Token验证失败!");
    String name = Env.api_token_prefix+String.valueOf(res.get("uid"));
    // 是否超时
    Long time = Redis.run().ttl(name);
    if(time <= 0) error("Token已超时!");
    res.put("n_time", time);
    // 是否续期
    if(Env.api_token_auto) Redis.run().setex(name, Env.api_token_time,"1");
    return res;
  }

  /* 生成 */
  public static String create(HashMap<String, Object> data) {
    data.put("l_time", Inc.date("yyyy-MM-dd HH:mm:ss"));
    String token = Safety.encode(data);
    // 缓存
    String name = Env.api_token_prefix+String.valueOf(data.get("uid"));
    Redis.run().setex(name, Env.api_token_time,"1");
    return token;
  }

}
