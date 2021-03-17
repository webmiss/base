package webmis.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import webmis.base.Base;
import webmis.config.Env;
import webmis.library.Redis;
import webmis.library.Safety;
import webmis.util.Util;

/* 后台Token */
public class AdminToken extends Base {

  /* 验证 */
  public static String verify(String token, String urlPerm) {
    // Token
    HashMap<String, Object> tData = Safety.decode(token);
    if(tData==null) return "Token验证失败!";
    if(Env.admin_token_auto){
      Redis redis = new Redis();
      String key = Env.admin_token_prefix+"_token_"+String.valueOf(tData.get("uid"));
      redis.Expire(key, Env.admin_token_time);
      redis.Close();
    }
    // URL权限
    if(urlPerm.equals("")) return "1";
    ArrayList<String> arr = Util.explode("/", urlPerm);
    // int index = arr.size()-1;
    // String action = String.valueOf(arr.get(index));
    // arr.remove(index);
    // String controller = Util.implode("/", arr);
    Print(tData, urlPerm, arr);
    // Print(controller, action);
    return "1";
  }

  /* 生成 */
  public static String create(HashMap<String, Object> data) {
    data.put("l_time", Util.date("yyyy-MM-dd HH:mm:ss"));
    String token = Safety.encode(data);
    // 缓存
    Redis redis = new Redis();
    String key = Env.admin_token_prefix+"_token_"+String.valueOf(data.get("uid"));
    redis.Set(key, "1");
    redis.Expire(key, Env.admin_token_time);
    redis.Close();
    return token;
  }
  
}
