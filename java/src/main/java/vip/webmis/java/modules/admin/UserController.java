package vip.webmis.java.modules.admin;

import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

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
  String login(String uname, String passwd) throws Exception {
    HashMap<String, Object> _res;
    passwd = Inc.md5(passwd);
    // 验证用户名
    if(Safety.isRight("uname",uname)!=true && Safety.isRight("tel",uname)!=true && Safety.isRight("email",uname)!=true){
      _res = new HashMap<String, Object>();
      _res.put("code",4000);
      _res.put("msg","请输入用户名/手机/邮箱");
      return getJSON(_res);
    }
    // 查询
    User model = new User();
    model.table("user AS a LEFT JOIN user_info AS b ON a.id=b.uid LEFT JOIN user_perm AS c ON a.id=c.uid");
    model.columns("a.id, a.state, b.position, b.nickname, b.name, b.gender, b.img, c.state_admin");
    JSONObject bind = new JSONObject();
    bind.put("uname",uname);
    bind.put("passwd",passwd);
    model.where("(a.uname=':uname:' OR a.tel=':uname:' OR a.email=':uname:') AND a.password=':passwd:'",bind);
    HashMap<String, Object> uData = model.findFirst();
    // 是否存在
    if(uData.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code",4000);
      _res.put("msg","帐号或密码错误");
      return getJSON(_res);
    }
    // 是否禁用
    if(!uData.get("state").equals("1")){
      _res = new HashMap<String, Object>();
      _res.put("code",4000);
      _res.put("msg","该用户已被禁用");
      return getJSON(_res);
    }else if(uData.get("state_admin")==null || !uData.get("state_admin").equals("1")){
      _res = new HashMap<String, Object>();
      _res.put("code",4000);
      _res.put("msg","该用户不允许登录");
      return getJSON(_res);
    }
    // 登录时间
    User m = new User();
    m.ltime = Inc.date("yyyy-MM-dd HH:mm:ss");
    m.where("id="+uData.get("id").toString());
    m.uField("ltime");
    m.update();
    // 返回
    _res = new HashMap<String, Object>();
    _res.put("code",0);
    _res.put("msg","成功");
    // 用户信息
    JSONObject uinfo = new JSONObject();
    uinfo.put("uid",uData.get("id"));
    uinfo.put("uname",uname);
    uinfo.put("position",uData.get("position"));
    uinfo.put("nickname",uData.get("nickname"));
    uinfo.put("name",uData.get("name"));
    uinfo.put("gender",uData.get("gender"));
    uinfo.put("img",!uData.get("img").equals("")?Env.base_url+(String)uData.get("img"):"");
    _res.put("uinfo",uinfo);
    // Token
    HashMap<String, Object> tData = new HashMap<String, Object>();
    tData.put("uid",uData.get("id").toString());
    tData.put("uname",uname);
    _res.put("token",AdminToken.create(tData));
    return getJSON(_res);
  }

  /* 验证Token */
  @RequestMapping("/token")
  String token(String token, Integer uinfo) throws Exception {
    HashMap<String, Object> _res;
    HashMap<String, Object> res = AdminToken.verify(token);
    if(!res.isEmpty()){
      if(uinfo!=1){
        _res = new HashMap<String, Object>();
        _res.put("code",0);
        _res.put("time",res.get("n_time"));
        return getJSON(_res);
      }
      // 用户信息
      UserInfo model = new UserInfo();
      model.where("uid="+res.get("uid").toString());
      model.columns("nickname,position,name,img");
      HashMap<String, Object> uData = model.findFirst();
      uData.put("uname",res.get("uname"));
      uData.put("img",!uData.get("img").equals("")?Env.base_url+uData.get("img"):"");
      // 返回
      _res = new HashMap<String, Object>();
      _res.put("code",0);
      _res.put("msg","成功");
      _res.put("time",res.get("n_time"));
      _res.put("uinfo",uData);
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code",4000);
      _res.put("msg","请重新登录!");
      return getJSON(_res);
    }
  }
  
}
