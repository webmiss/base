package webmis.service;

import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSONArray;

import webmis.config.Env;
import webmis.library.Redis;
import webmis.library.Safety;
import webmis.model.SysMenu;
import webmis.util.Hash;
import webmis.util.Util;

/* 后台Token */
public class AdminToken extends Base {

  /* 验证 */
  public static String Verify(String token, String urlPerm) {
    // Token
    if(token.equals("")) return "Token不能为空!";
    HashMap<String, Object> tData = Safety.Decode(token);
    if(tData==null) return "Token验证失败!";
    // 是否过期
    String uid = String.valueOf(tData.get("uid"));
    String key = Env.admin_token_prefix+"_token_"+uid;
    Redis redis = new Redis("");
    String access_token = redis.Get(key);
    Long time = redis.Ttl(key);
    redis.Close();
    if(Env.admin_token_sso) {
      if(!access_token.equals(Hash.Md5(token))) return "强制退出!";
    }
    if(time<1) return "Token已过期!";
    // 续期
    if(Env.admin_token_auto){
      redis = new Redis("");
      redis.Expire(key, Env.admin_token_time);
      redis.Expire(Env.admin_token_prefix+"_perm_"+uid, Env.admin_token_time);
      redis.Close();
    }
    // URL权限
    if(urlPerm.equals("")) return "";
    ArrayList<String> arr = Util.Explode("/", urlPerm);
    int index = arr.size()-1;
    String action = arr.get(index);
    arr.remove(index);
    String controller = Util.Implode("/", arr);
    // 菜单
    SysMenu menu = new SysMenu();
    menu.Columns("id", "action");
    menu.Where("controller=?", controller);
    HashMap<String, Object> menuData = menu.FindFirst();
    if(menuData.size()==0) return "菜单验证无效!";
    // 验证-菜单
    String id = menuData.get("id").toString();
    HashMap<String, Long> permData= Perm(token);
    if(!permData.containsKey(id)) return "无权访问菜单!";
    // 验证-动作
    long actionVal = permData.get(id);
    JSONArray permArr = Util.JsonDecodeArray(menuData.get("action").toString());
    long permVal = (long) 0;
    for(int i=0; i<permArr.size(); i++){
      if(permArr.getJSONObject(i).get("action").equals(action)){
        permVal = Long.valueOf(permArr.getJSONObject(i).get("perm").toString());
        break;
      }
    }
    if((actionVal&permVal)==0) return "无权访问动作!";
    return "";
  }

  /* 权限数组 */
  public static HashMap<String, Long> Perm(String token) {
    HashMap<String, Long> permAll = new HashMap<String, Long>();
    // Token
    HashMap<String, Object> tData = Safety.Decode(token);
    if(tData==null) return permAll;
    // 权限
    Redis redis = new Redis("");
    String permStr = redis.Get(Env.admin_token_prefix+"_perm_"+tData.get("uid").toString());
    redis.Close();
    // 拆分
    ArrayList<String> arr = !permStr.isEmpty()?Util.Explode(" ", permStr):new ArrayList<String>();
    ArrayList<String> s;
    for(String val : arr){
      s = Util.Explode(":", val);
      permAll.put(s.get(0), Long.valueOf(s.get(1)));
    }
    return permAll;
  }

  /* 生成 */
  public static String Create(HashMap<String, Object> data) {
    data.put("l_time", Util.Date("yyyy-MM-dd HH:mm:ss"));
    String token = Safety.Encode(data);
    // 缓存
    Redis redis = new Redis("");
    String key = Env.admin_token_prefix+"_token_"+String.valueOf(data.get("uid"));
    redis.Set(key, Hash.Md5(token));
    redis.Expire(key, Env.admin_token_time);
    redis.Close();
    return token;
  }

  /* 解析 */
  public static HashMap<String, Object> Token(String token) {
    HashMap<String, Object> tData = Safety.Decode(token);
    if(tData!=null){
      Redis redis = new Redis("");
      tData.put("time", redis.Ttl(Env.admin_token_prefix+"_token_"+String.valueOf(tData.get("uid"))));
      redis.Close();
    }
    return tData;
  }
  
}
