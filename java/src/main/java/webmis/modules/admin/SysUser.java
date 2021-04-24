package webmis.modules.admin;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.config.Env;
import webmis.library.Safety;
import webmis.model.ApiPerm;
import webmis.model.User;
import webmis.model.UserInfo;
import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.service.Data;
import webmis.util.Util;

@RestController
@Controller("AdminSysUser")
@RequestMapping("/admin/sysuser")
public class SysUser extends Base {

  /* 列表 */
  @RequestMapping("list")
  String List(HttpServletRequest request, String token, String data, int page, int limit) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    if(data=="" || page==0 || limit==0){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    JSONObject param = Util.JsonDecode(data);
    String uname = param.containsKey("uname")?String.valueOf(param.get("uname")).trim():"";
    // 统计
    User model = new User();
    model.Columns("count(*) AS num");
    HashMap<String, Object> total = model.FindFirst();
    // 查询
    model.Table("user as a");
    model.LeftJoin("user_info as b", "a.id=b.uid");
    model.LeftJoin("sys_perm as c", "a.id=c.uid");
    model.Columns(
      "a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
      "b.nickname", "b.position", "b.name", "b.gender", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday", "b.img",
      "c.role", "c.perm"
    );
    model.Where(
      "a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?",
      "%"+uname+"%", "%"+uname+"%", "%"+uname+"%"
    );
    model.Order("a.id DESC");
    model.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = model.Find();
    // 状态
    for (HashMap<String, Object> val : list) {
      val.put("uid", val.get("uid").toString());
      val.put("state", val.get("state").equals("1")?true:false);
      val.put("img", Data.Img(val.get("img")));
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    res.put("total", total.get("num"));
    return GetJSON(res);
  }

  /* 添加 */
  @RequestMapping("add")
  String Add(HttpServletRequest request, String token, String data) throws SQLException {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    if(data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    JSONObject param = Util.JsonDecode(data);
    String tel = param.containsKey("tel")?String.valueOf(param.get("tel")).trim():"";
    String passwd = param.containsKey("passwd")?String.valueOf(param.get("passwd")):Env.password;
    // 验证
    if(!Safety.IsRight("tel", tel)){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "手机号码有误!");
      return GetJSON(res);
    }
    if(!Safety.IsRight("passwd", passwd)){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "密码为6～16位!");
      return GetJSON(res);
    }
    // 是否存在
    User m = new User();
    m.Columns("id");
    m.Where("tel=?", tel);
    HashMap<String, Object> user = m.FindFirst();
    if(!user.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "该用户已存在!");
      return GetJSON(res);
    }
    // 新增
    String sql;
    PreparedStatement ps;
    long uid = Data.GetId("ID");
    Connection conn = m.DBConn();
    try {
      conn.setAutoCommit(false);
      // 用户
      User m1 = new User();
      m1.Values("id", "tel", "password");
      sql = m1.InsertSql();
      ps = conn.prepareStatement(sql);
      ps.setLong(1, uid);
      ps.setString(2, tel);
      ps.setString(3, Util.Md5(passwd));
      ps.executeUpdate();
      ps.close();
      // 详情
      UserInfo m2 = new UserInfo();
      m2.Values("uid");
      sql = m2.InsertSql();
      ps = conn.prepareStatement(sql);
      ps.setLong(1, uid);
      ps.executeUpdate();
      ps.close();
      // 权限
      ApiPerm m3 = new ApiPerm();
      m3.Values("uid", "role", "utime");
      sql = m3.InsertSql();
      ps = conn.prepareStatement(sql);
      ps.setLong(1, uid);
      ps.setInt(2, 1);
      ps.setLong(3, Util.Time());
      ps.executeUpdate();
      ps.close();
      // 提交
      conn.commit();
      // 返回
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } catch (SQLException e) {
      conn.rollback();
      // 返回
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "添加失败!");
    } finally {
      conn.close();
    }
    return GetJSON(res);
  }
  
}
