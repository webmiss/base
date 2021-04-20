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
import webmis.service.Data;
import webmis.library.FileEo;
import webmis.library.Upload;
import webmis.service.AdminToken;
import webmis.util.Util;

@RestController
@Controller("AdminUserInfo")
@RequestMapping("/admin/userinfo")
public class UserInfo extends Base {

  private static final String ImgDir = "upload/user/img/";

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
    model.Columns("nickname", "name", "gender", "FROM_UNIXTIME(birthday, '%Y-%m-%d') as birthday", "position", "img");
    model.Where("uid=?");
    String sql = model.SelectSql();
    PreparedStatement ps = model.Bind(sql);
    ps.setString(1, tData.get("uid").toString());
    HashMap<String, Object> list = model.FindFirst(ps);
    // 数据
    list.put("img", Data.Img(list.get("img")));
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
    JSONObject param = Util.JsonDecode(data);
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

  /* 头像 */
  @RequestMapping("upimg")
  String Upimg(HttpServletRequest request, String token, String base64) throws SQLException {
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
    if(base64==null || base64.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 上传
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("path",ImgDir);
    param.put("base64",base64);
    String img = Upload.Base64(param);
    if(img.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    }
    // 数据
    webmis.model.UserInfo model = new webmis.model.UserInfo();
    model.Columns("img");
    model.Where("uid=?");
    String sql = model.SelectSql();
    PreparedStatement ps = model.Bind(sql);
    ps.setString(1, tData.get("uid").toString());
    HashMap<String, Object> imgData = model.FindFirst(ps);
    model.Set("img");
    model.Where("uid=?");
    sql = model.UpdateSql();
    ps = model.Bind(sql);
    ps.setString(1, ImgDir+img);
    ps.setString(2, tData.get("uid").toString());
    if(!model.Update(ps)){
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "上传失败!");
      return GetJSON(res);
    }
    // 清理
    String rmImg = imgData.get("img").toString();
    FileEo.RemoveAll(rmImg);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("img", Data.Img(ImgDir+img));
    return GetJSON(res);
  }

}
