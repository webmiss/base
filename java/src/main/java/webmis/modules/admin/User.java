package webmis.modules.admin;

import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.service.Data;
import webmis.config.Env;
import webmis.library.Redis;
import webmis.library.Safety;
import webmis.model.UserInfo;
import webmis.service.AdminToken;
import webmis.util.Hash;
import webmis.util.Util;

@RestController
@Controller("AdminUser")
@RequestMapping("/admin/user")
public class User extends Base {

  /* 登录 */
  @RequestMapping("login")
  String login(@RequestBody JSONObject json) {
    HashMap<String,Object> res;
    // 参数
    String uname = JsonName(json, "uname");
    String passwd = JsonName(json, "passwd");
    // 验证用户名
    if(!Safety.IsRight("uname",uname) && !Safety.IsRight("tel",uname) && !Safety.IsRight("email",uname)){
      res = new HashMap<String, Object>();
      res.put("code",4000);
      res.put("msg","请输入用户名/手机/邮箱!");
      return GetJSON(res);
    }
    // 密码长度
    if(!Safety.IsRight("passwd",passwd)){
      res = new HashMap<String, Object>();
      res.put("code",4000);
      res.put("msg","请输入6~16位密码!");
      return GetJSON(res);
    }
    // 查询
    webmis.model.User model = new webmis.model.User();
    model.Table("user AS a");
    model.LeftJoin("user_info AS b", "a.id=b.uid");
    model.LeftJoin("sys_perm AS c", "a.id=c.uid");
    model.LeftJoin("sys_role AS d", "c.role=d.id");
    model.Columns("a.id", "a.state", "b.position", "b.nickname", "b.name", "b.gender", "b.birthday", "b.img", "c.perm", "d.perm as role_perm");
    model.Where(
      "(a.uname=? OR a.tel=? OR a.email=?) AND a.password=?",
      uname, uname, uname, Hash.Md5(passwd)
    );
    HashMap<String, Object> data = model.FindFirst();
    // 是否存在
    if(data.isEmpty()){
      res = new HashMap<String, Object>();
      res.put("code",4000);
      res.put("msg","帐号或密码错误!");
      return GetJSON(res);
    }
    // 是否禁用
    if(!data.get("state").equals("1")){
      res = new HashMap<String, Object>();
      res.put("code",4000);
      res.put("msg","该用户已被禁用!");
      return GetJSON(res);
    }
    // 权限
    String perm = String.valueOf(data.get("role_perm"));
    if(!data.get("perm").equals("")) perm=String.valueOf(data.get("perm"));
    if(perm.equals("")){
      res = new HashMap<String, Object>();
      res.put("code",4000);
      res.put("msg","该用户不允许登录!");
      return GetJSON(res);
    }
    Redis redis = new Redis("");
    String key = Env.admin_token_prefix+"_perm_"+String.valueOf(data.get("id"));
    redis.Set(key, perm);
    redis.Expire(key, Env.admin_token_time);
    redis.Close();
    // 登录时间
    model.Table("user");
    HashMap<String, Object> upParam = new HashMap<String, Object>();
    upParam.put("ltime", Util.Time());
    model.Set(upParam);
    model.Where("id=?", data.get("id").toString());
    model.Update();
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    // Token
    HashMap<String, Object> token = new HashMap<String, Object>();
    token.put("uid", data.get("id").toString());
    token.put("uname", uname);
    res.put("token", AdminToken.Create(token));
    // 用户信息
    HashMap<String,Object> uinfo = new HashMap<String,Object>();
    uinfo.put("uid", data.get("id"));
    uinfo.put("uname", uname);
    uinfo.put("position", data.get("position"));
    uinfo.put("nickname", data.get("nickname"));
    uinfo.put("name", data.get("name"));
    uinfo.put("gender", data.get("gender"));
    uinfo.put("img", !data.get("img").equals("")?Env.base_url+(String)data.get("img"):"");
    res.put("uinfo", uinfo);
    return GetJSON(res);
  }

  /* Token验证 */
  @RequestMapping("token")
  String Token(@RequestBody JSONObject json) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String uinfo = JsonName(json, "uinfo");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    HashMap<String, Object> tData = AdminToken.Token(token);
    if(!uinfo.equals("1")){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
      res.put("token_time", tData.get("time"));
      return GetJSON(res);
    }
    // 用户信息
    UserInfo model = new UserInfo();
    model.Columns("nickname","position","name","img");
    model.Where("uid=?", tData.get("uid").toString());
    HashMap<String, Object> info = model.FindFirst();
    info.put("uid", tData.get("uid").toString());
    info.put("uname", tData.get("uname"));
    info.put("img", Data.Img(info.get("img")));
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("token_time", tData.get("time"));
    res.put("uinfo", info);
    return GetJSON(res);
  }

}
