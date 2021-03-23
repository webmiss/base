package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.base.Base;
import webmis.service.AdminToken;
import webmis.util.Util;

@RestController
@Controller("AdminUserInfo")
@RequestMapping("/admin/userinfo")
public class UserInfo extends Base {

  /* 列表 */
  @RequestMapping("list")
  String List(HttpServletRequest request, String token, String data) throws SQLException {
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
    // 查询
    webmis.model.UserInfo model = new webmis.model.UserInfo();
    model.Columns("nickname", "name", "gender", "birthday", "position", "img");
    model.Where("uid=?");
    String sql = model.SelectSql();
    PreparedStatement ps = model.Bind(sql);
    ps.setString(1, tData.get("uid").toString());
    HashMap<String, Object> list = model.FindFirst(ps);
    // 数据
    list.put("birthday", Util.Date("yyyy-MM-dd", list.get("birthday").toString()));
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    return GetJSON(res);
  }

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(HttpServletRequest request, String token, String data) throws SQLException {
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
    if(data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    JSONObject param = Util.Json_decode(data);
    // 数据
    webmis.model.UserInfo model = new webmis.model.UserInfo();
    HashMap<String,Object> info = new HashMap<String,Object>();
    info.put("nickname", Util.Trim(param.get("nickname").toString()));
    info.put("name", Util.Trim(param.get("name").toString()));
    info.put("gender", Util.Trim(param.get("gender").toString()));
    info.put("birthday", Util.Trim(param.get("birthday").toString()));
    info.put("position", Util.Trim(param.get("position").toString()));
    model.Set("nickname", "name", "gender", "birthday", "position");
    model.Where("uid=?");
    String sql = model.UpdateSql();
    PreparedStatement ps = model.Bind(sql);
    ps.setString(1, info.get("nickname").toString());
    ps.setString(2, info.get("name").toString());
    ps.setString(3, info.get("gender").toString());
    ps.setLong(4, Util.Strtotime(info.get("birthday").toString(), "yyyy-MM-dd"));
    ps.setString(5, info.get("position").toString());
    ps.setString(6, tData.get("uid").toString());
    model.Update(ps);
    // 返回
    info.put("uname", tData.get("uname").toString());
    info.put("img", param.get("img").toString());
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("uinfo", info);
    return GetJSON(res);
  }
  
}
