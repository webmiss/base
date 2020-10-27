package vip.webmis.java.modules.admin;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.library.Safety;
import vip.webmis.java.model.User;
import vip.webmis.java.model.UserInfo;

/* 用户登录 */
@RestController
@Controller("AdminUserController")
@RequestMapping("/admin/user")
public class UserController extends Base {

  /* 登录 */
  @RequestMapping("/login")
  String login(String uname, String passwd){
    HashMap<String,Object> params;
    HashMap<String,Object> _res = new HashMap<String,Object>();
    passwd = Inc.md5(passwd);
    // 验证用户名
    if(Safety.isRight("uname",uname)!=true && Safety.isRight("tel",uname)!=true && Safety.isRight("email",uname)!=true){
      _res.put("code",4000);
      _res.put("msg","请输入用户名/手机/邮箱");
      return getJSON(_res);
    }
    // 查询数据
    params = new HashMap<String,Object>();
    params.put("table","user as a LEFT JOIN user_info as b ON a.id=b.uid LEFT JOIN user_perm as c ON a.id=c.uid");
    params.put("columns","a.id, a.state, b.position, b.nickname, b.name, b.gender, b.img, c.state_admin");
    params.put("where","(a.uname='"+uname+"' OR a.tel='"+uname+"' OR a.email='"+uname+"') AND a.password='"+passwd+"'");
    HashMap<String,Object> uData = new User().findFirst(params);
    // 是否存在
    if(uData.isEmpty()){
      _res.put("code",4000);
      _res.put("msg","帐号或密码错误");
      return getJSON(_res);
    }
    // 是否禁用
    if(!uData.get("state").equals("1")){
      _res.put("code",4000);
      _res.put("msg","该用户已被禁用");
      return getJSON(_res);
    }else if(!uData.get("state_admin").equals("1")){
      _res.put("code",4000);
      _res.put("msg","该用户不允许登录");
      return getJSON(_res);
    }
    // 登录时间
    HashMap<String,Object> data = new HashMap<String,Object>();
    data.put("ltime", Inc.date("y-M-d H:m:s"));
    params = new HashMap<String,Object>();
    params.put("data", data);
    params.put("where","id="+uData.get("id"));
    new User().update(params);
    // 返回
    _res.put("code",0);
    _res.put("msg","成功");
    HashMap<String,Object> uinfo = new HashMap<String,Object>();
    uinfo.put("uid",uData.get("id"));
    uinfo.put("uname",uname);
    uinfo.put("position",uData.get("position"));
    uinfo.put("nickname",uData.get("nickname"));
    uinfo.put("name",uData.get("name"));
    uinfo.put("gender",uData.get("gender"));
    uinfo.put("img",!uData.get("img").equals("")?Env.base_url+(String)uData.get("img"):"");
    _res.put("uinfo",uinfo);
    HashMap<String,Object> tData = new HashMap<String,Object>();
    tData.put("uid",uData.get("id"));
    tData.put("uname",uname);
    _res.put("token",AdminToken.create(tData));
    return getJSON(_res);
  }

  /* 验证Token */
  @RequestMapping("/token")
  String token(String token, Integer uinfo) throws Exception {
    HashMap<String,Object> data = new HashMap<String,Object>();
    HashMap<String, Object> res = AdminToken.verify(token);
    if(!res.isEmpty()){
      if(uinfo!=1){
        data.put("code",0);
        data.put("time",res.get("n_time"));
        return getJSON(data);
      }
      // 用户信息
      HashMap<String, Object> params = new HashMap<String, Object>();
      params.put("where","uid="+res.get("uid"));
      params.put("columns","nickname,position,name,img");
      HashMap<String, Object> uData = new UserInfo().findFirst(params);
      uData.put("uname",res.get("uname"));
      uData.put("img",!uData.get("img").equals("")?Env.base_url+uData.get("img"):"");
      data.put("code",0);
      data.put("msg","成功");
      data.put("time",res.get("n_time"));
      data.put("uinfo",uData);
      return getJSON(data);
    }else{
      data.put("code",4000);
      data.put("msg","请重新登录!");
      return getJSON(data);
    }
  }
  
}
