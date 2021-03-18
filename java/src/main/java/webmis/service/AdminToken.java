package webmis.service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSONArray;

import webmis.base.Base;
import webmis.config.Env;
import webmis.library.Redis;
import webmis.library.Safety;
import webmis.model.SysMenu;
import webmis.util.Util;

/* 后台Token */
public class AdminToken extends Base {

  /* 验证 */
  public static String verify(String token, String urlPerm) throws SQLException {
    // Token
    HashMap<String, Object> tData = Safety.decode(token);
    if(tData==null) return "Token验证失败!";
    // 续期
    if(Env.admin_token_auto){
      Redis redis = new Redis();
      redis.Expire(Env.admin_token_prefix+"_token_"+String.valueOf(tData.get("uid")), Env.admin_token_time);
      redis.Expire(Env.admin_token_prefix+"_perm_"+String.valueOf(tData.get("uid")), Env.admin_token_time);
      redis.Close();
    }
    // URL权限
    if(urlPerm.equals("")) return "";
    ArrayList<String> arr = Util.explode("/", urlPerm);
    int index = arr.size()-1;
    String action = arr.get(index);
    arr.remove(index);
    String controller = Util.implode("/", arr);
    // 菜单
    SysMenu menu = new SysMenu();
    menu.Columns("id", "action");
    menu.Where("controller=?");
    String sql = menu.SelectSql();
    PreparedStatement ps = menu.Bind(sql);
    ps.setString(1, controller);
    HashMap<String, Object> menuData = menu.FindFirst(ps);
    if(menuData.size()==0) return "菜单验证无效!";
    // 验证-菜单
    String id = menuData.get("id").toString();
    HashMap<String, Integer> permData= perm(tData.get("uid").toString());
    if(!permData.containsKey(id)) return "无权访问菜单!";
    // 验证-动作
    Integer actionVal = permData.get(id);
    JSONArray permArr = Util.json_decode_array(menuData.get("action").toString());
    int permVal = 0;
    for(int i=0; i<permArr.size(); i++){
      if(permArr.getJSONObject(i).get("action").equals(action)){
        permVal = Integer.valueOf(permArr.getJSONObject(i).get("perm").toString());
        break;
      }
    }
    if(permVal==0) return "动作验证无效!";
    if((actionVal&permVal)==0) return "无权访问动作!";
    return "";
  }

  /* 权限数组 */
  public static HashMap<String, Integer> perm(String uid) {
    // 权限
    Redis redis = new Redis();
    String key = Env.admin_token_prefix+"_perm_"+uid;
    String permStr = redis.Get(key);
    redis.Close();
    // 拆分
    HashMap<String, Integer> permAll = new HashMap<String, Integer>();
    ArrayList<String> arr = Util.explode(" ", permStr);
    ArrayList<String> s;
    for(String val : arr){
      s = Util.explode(":", val);
      permAll.put(s.get(0), Integer.valueOf(s.get(1)));
    }
    return permAll;
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

  /* 获取 */
  public static HashMap<String, Object> token(String token) {
    return Safety.decode(token);
  }
  
}
