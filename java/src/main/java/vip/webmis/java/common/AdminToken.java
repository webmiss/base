package vip.webmis.java.common;

import java.util.ArrayList;
import java.util.HashMap;

import vip.webmis.java.Env;
import vip.webmis.java.library.Inc;
import vip.webmis.java.library.Redis;
import vip.webmis.java.library.Safety;
import vip.webmis.java.model.SysMenu;
import vip.webmis.java.model.UserPerm;
import vip.webmis.java.model.UserRole;

public class AdminToken extends Base {

  /* 验证&数据 */
  public static HashMap<String, Object> verify(String token) throws Exception {
    // 验证Token
    HashMap<String, Object> res = Safety.decode(token);
    if(res==null || res.isEmpty()) error("Token验证失败!");
    String name = Env.admin_token_prefix+String.valueOf(res.get("uid"));
    // 是否超时
    Long time = Redis.run().ttl(name);
    if(time <= 0) error("Token已超时!");
    res.put("n_time", time);
    // 是否续期
    if(Env.admin_token_auto) Redis.run().setex(name, Env.admin_token_time,"1");
    return res;
  }

  /* 生成 */
  public static String create(HashMap<String, Object> data) {
    data.put("l_time", Inc.date("yMdHms"));
    String token = Safety.encode(data);
    // 缓存
    String name = Env.admin_token_prefix+String.valueOf(data.get("uid"));
    Redis.run().setex(name, Env.admin_token_time,"1");
    return token;
  }

  /* 用户权限 */
  public static HashMap<String, Object> perm(String uid) throws Exception {
    // 权限
    HashMap<String, Object> params = new HashMap<String, Object>();
    params.put("where", "uid="+uid);
    params.put("columns", "perm,role");
    HashMap<String, Object> perm = new UserPerm().findFirst(params);
    if(perm.isEmpty()) error("没有分配权限!");
    if(!perm.get("role").equals("0")){
      params = new HashMap<String, Object>();
      params.put("where", "id="+perm.get("role"));
      params.put("columns", "perm");
      perm = new UserRole().findFirst(params);
    }
    // 拆分
    HashMap<String, Object> permAll = new HashMap<String, Object>();
    String permStr = (String)perm.get("perm");
    String[] arr = permStr.split(" ");
    for(String val : arr){
      String[] s = val.split(":");
      permAll.put(String.valueOf(s[0]),s[1]);
    }
    return permAll;
  }

  /* Url权限 */
  public static HashMap<String, Object> urlVerify(String token, String url) throws Exception {
    HashMap<String, Object> params;
    HashMap<String, Object> res = verify(token);
    // 全部菜单
    params = new HashMap<String, Object>();
    params.put("where", "url<>\"\"");
    params.put("columns", "id,url");
    ArrayList<HashMap<String, Object>> all = new SysMenu().find(params);
    HashMap<String, Object> menus = new HashMap<String, Object>();
    for(HashMap<String, Object> val : all){
      menus.put((String)val.get("url"), (Integer)val.get("id"));
    }
    // 是否存在
    if(!menus.containsKey(url)) error("Url错误!");
    // 权限
    HashMap<String, Object> permAll = perm(String.valueOf(res.get("uid")));
    // 是否有权限
    if(!permAll.containsKey(String.valueOf(menus.get(url)))) error("无权访问!");
    return res;
  }

}
