package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.base.Base;
import webmis.config.Env;
import webmis.library.Redis;
import webmis.library.Safety;
import webmis.service.AdminToken;
import webmis.util.Util;

@RestController
@Controller("AdminUser")
@RequestMapping("/admin")
public class User extends Base {

  /* 登录 */
  @RequestMapping("user/login")
  String login(String uname, String passwd) throws SQLException{
    HashMap<String,Object> res;
    // 验证用户名
    if(!Safety.isRight("uname",uname) && !Safety.isRight("tel",uname) && !Safety.isRight("email",uname)){
      res = new HashMap<String, Object>();
      res.put("code",4000);
      res.put("msg","请输入用户名/手机/邮箱!");
      return GetJSON(res);
    }
    // 密码长度
    if(!Safety.isRight("passwd",passwd)){
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
    model.Columns("a.id", "a.state", "b.position", "b.nickname", "b.name", "b.gender", "b.birthday", "b.img", "c.role", "c.perm");
    model.Where("(a.uname=? OR a.tel=? OR a.email=?) AND a.password=?");
    String sql = model.SelectSql();
    PreparedStatement ps = model.Bind(sql);
    ps.setString(1, uname);
    ps.setString(2, uname);
    ps.setString(3, uname);
    ps.setString(4, Util.md5(passwd));
    HashMap<String, Object> data = model.FindFirst(ps);
    // 是否存在
    if(data.size()==0){
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
    String perm = String.valueOf(data.get("role"));
    if(!data.get("perm").equals("")) perm=String.valueOf(data.get("perm"));
    if(perm.equals("")){
      res = new HashMap<String, Object>();
      res.put("code",4000);
      res.put("msg","该用户不允许登录!");
      return GetJSON(res);
    }
    Redis redis = new Redis();
    String key = Env.admin_token_prefix+"_perm_"+String.valueOf(data.get("id"));
    redis.Set(key, perm);
    redis.Expire(key, Env.admin_token_time);
    redis.Close();
    // 登录时间
    model.Table("user");
    model.Set("ltime");
    model.Where("id=?");
    sql = model.UpdateSql();
    ps = model.Bind(sql);
    ps.setString(1, Util.date("yyyy-MM-dd HH:mm:ss"));
    ps.setString(2, data.get("id").toString());
    model.Update(ps);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    // Token
    HashMap<String, Object> token = new HashMap<String, Object>();
    token.put("uid", data.get("id").toString());
    token.put("uname", uname);
    res.put("token", AdminToken.create(token));
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
  @RequestMapping("user/token")
  String Token(HttpServletRequest request, String token, String uinfo) {
    // 验证
    String verify = AdminToken.verify(token, request.getRequestURI());
    Print(verify, verify.equals("1"));
    // 参数
    HashMap<String,Object> res;
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    return GetJSON(res);
  }

}
