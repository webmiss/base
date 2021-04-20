package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.model.User;
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
  String List(HttpServletRequest request, String token, String data, int page, int limit) throws SQLException {
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
    JSONObject sea = Util.JsonDecode(data);
    String uname = sea.containsKey("uname")?String.valueOf(sea.get("uname")).trim():"";
    // 统计
    User model = new User();
    model.Columns("count(*) AS num");
    String sql = model.SelectSql();
    PreparedStatement ps = model.Bind(sql);
    HashMap<String, Object> total = model.FindFirst(ps);
    // 查询
    model.Table("user as a");
    model.LeftJoin("user_info as b", "a.id=b.uid");
    model.LeftJoin("sys_perm as c", "a.id=c.uid");
    model.Columns(
      "a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
      "b.nickname", "b.position", "b.name", "b.gender", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday", "b.img",
      "c.role", "c.perm"
    );
    model.Where("a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?");
    model.Order("a.id DESC");
    model.Page(page, limit);
    sql = model.SelectSql();
    ps = model.Bind(sql);
    ps.setString(1, "%"+uname+"%");
    ps.setString(2, "%"+uname+"%");
    ps.setString(3, "%"+uname+"%");
    ArrayList<HashMap<String,Object>> list = model.Find(ps);
    // 状态
    for (HashMap<String, Object> val : list) {
      val.put("uid", val.get("uid").toString());
      val.put("state", val.get("state").equals("1")?true:false);
      val.put("img", Data.Img(val.get("img")));
      // val.put("birthday", Util.Date("yyyy-MM-dd", val.get("birthday").toString()));
      // val.put("rtime", Util.Date("yyyy-MM-dd HH:mm:ss", val.get("rtime").toString()));
      // val.put("ltime", Util.Date("yyyy-MM-dd HH:mm:ss", val.get("ltime").toString()));
      // val.put("utime", Util.Date("yyyy-MM-dd HH:mm:ss", val.get("utime").toString()));
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    res.put("total", total.get("num"));
    return GetJSON(res);
  }
  
}
