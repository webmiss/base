package vip.webmis.java.modules.admin;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.library.Safety;
import vip.webmis.java.model.User;

@RestController
@Controller("UserPasswdController")
@RequestMapping("/admin/Userpasswd")
public class UserpasswdController extends Base {

  /* 修改密码 */
  @RequestMapping("/edit")
  String index(String token, String passwd, String passwd1) throws Exception {
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token,"UserPasswd");
    HashMap<String, Object> _res;
    // 验证
    if(passwd==passwd1){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "不能与原密码相同!");
      return getJSON(_res);
    }
    if(!Safety.isRight("passwd",passwd) || !Safety.isRight("passwd",passwd1)){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "密码格式错误!");
      return getJSON(_res);
    }
    // 用户信息
    HashMap<String, Object> params = new HashMap<String, Object>();
    params.put("where",String.format("id=%s AND password=\"%s\"",tokenData.get("uid"),Inc.md5(passwd)));
    params.put("columns","id");
    HashMap<String, Object> info = new User().findFirst(params);
    if(info.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "当前密码错误!");
      return getJSON(_res);
    }
    // 保存
    params = new HashMap<String, Object>();
    params.put("password",Inc.md5(passwd1));
    HashMap<String, Object> uData = new HashMap<String, Object>();
    uData.put("data",params);
    uData.put("where",String.format("id=%s",tokenData.get("uid")));
    boolean res = new User().update(uData);
    if(res){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "修改失败!");
      return getJSON(_res);
    }
  }

}