package webmis.modules.admin;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.service.AdminToken;
import webmis.library.Safety;
import webmis.model.User;
import webmis.util.Hash;

@RestController
@Controller("AdminUserPasswd")
@RequestMapping("/admin/user_passwd")
public class UserPasswd extends Base {

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String passwd = JsonName(json, "passwd");
    String passwdNew = JsonName(json, "passwdNew");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(passwd==passwdNew) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "不能与原密码相同!");
      return GetJSON(res);
    }
    if(!Safety.IsRight("passwd", passwd) || !Safety.IsRight("passwd", passwdNew)) {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "密码为6～16位!");
      return GetJSON(res);
    }
    // 数据
    HashMap<String, Object> tData = AdminToken.Token(token);
    User model = new User();
    model.Columns("id");
    model.Where("id=? AND password=?", tData.get("uid").toString(), Hash.Md5(passwd));
    HashMap<String, Object> uData = model.FindFirst();
    if(uData.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "当前密码错误!");
      return GetJSON(res);
    }
    HashMap<String, Object> upParam = new HashMap<String, Object>();
    upParam.put("password", Hash.Md5(passwdNew));
    model.Set(upParam);
    model.Where("id=?", tData.get("uid").toString());
    if(!model.Update()) {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "修改失败!");
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    return GetJSON(res);
  }

}
