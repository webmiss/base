package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.service.AdminToken;
import webmis.library.Safety;
import webmis.model.User;
import webmis.util.Util;

@RestController
@Controller("AdminUserPasswd")
@RequestMapping("/admin/userpasswd")
public class UserPasswd extends Base {

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(HttpServletRequest request, String token, String passwd, String passwdNew) throws SQLException {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    HashMap<String, Object> tData = AdminToken.token(token);
    // 参数
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
    User model = new User();
    model.Columns("id");
    model.Where("id=? AND password=?");
    String sql = model.SelectSql();
    PreparedStatement ps = model.Bind(sql);
    ps.setString(1, tData.get("uid").toString());
    ps.setString(2, Util.Md5(passwd));
    HashMap<String, Object> uData = model.FindFirst(ps);
    if(uData.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "当前密码错误!");
      return GetJSON(res);
    }
    model.Set("password");
    model.Where("id=?");
    sql = model.UpdateSql();
    ps = model.Bind(sql);
    ps.setString(1, Util.Md5(passwdNew));
    ps.setString(2, tData.get("uid").toString());
    if(!model.Update(ps)) {
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
