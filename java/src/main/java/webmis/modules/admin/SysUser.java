package webmis.modules.admin;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.config.Env;
import webmis.library.Redis;
import webmis.library.Safety;
import webmis.model.ApiPerm;
import webmis.model.ApiRole;
import webmis.model.SysPerm;
import webmis.model.SysRole;
import webmis.model.User;
import webmis.model.UserInfo;
import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.service.Data;
import webmis.util.Hash;
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
    String msg = AdminToken.Verify(token, request.getRequestURI());
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
    User m = new User();
    m.Columns("count(*) AS num");
    m.Where("uname LIKE ? OR tel LIKE ? OR email LIKE ?", "%"+uname+"%", "%"+uname+"%", "%"+uname+"%");
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Table("user as a");
    m.LeftJoin("user_info as b", "a.id=b.uid");
    m.LeftJoin("sys_perm as c", "a.id=c.uid");
    m.LeftJoin("api_perm as d", "a.id=d.uid");
    m.Columns(
      "a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
      "b.nickname", "b.position", "b.name", "b.gender", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday", "b.img",
      "c.role AS sys_role", "c.perm AS sys_perm",
      "d.role AS api_role", "d.perm AS api_perm"
    );
    m.Where("a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?", "%"+uname+"%", "%"+uname+"%", "%"+uname+"%");
    m.Order("a.id DESC");
    m.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = m.Find();
    // 数据
    for (HashMap<String, Object> val : list) {
      val.put("uid", val.get("uid").toString());
      val.put("state", val.get("state").equals("1")?true:false);
      val.put("img", Data.Img(val.get("img")));
      if(val.get("sys_role")==null) val.put("sys_role", "");
      if(val.get("sys_perm")==null) val.put("sys_perm", "");
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
    String msg = AdminToken.Verify(token, request.getRequestURI());
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
    String passwd = param.containsKey("passwd")?String.valueOf(param.get("passwd")).trim():Env.password;
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
    long uid = Data.Mist("ID");
    Connection conn = m.DBConn();
    try {
      conn.setAutoCommit(false);
      // 用户
      // User m1 = new User();
      // m1.Values("id", "tel", "password");
      // sql = m1.InsertSql();
      // ps = conn.prepareStatement(sql);
      // ps.setLong(1, uid);
      // ps.setString(2, tel);
      // ps.setString(3, Hash.Md5(passwd));
      // ps.executeUpdate();
      // ps.close();
      // 详情
      // UserInfo m2 = new UserInfo();
      // m2.Values("uid");
      // sql = m2.InsertSql();
      // ps = conn.prepareStatement(sql);
      // ps.setLong(1, uid);
      // ps.executeUpdate();
      // ps.close();
      // 权限
      // ApiPerm m3 = new ApiPerm();
      // m3.Values("uid", "role", "utime");
      // sql = m3.InsertSql();
      // ps = conn.prepareStatement(sql);
      // ps.setLong(1, uid);
      // ps.setInt(2, 1);
      // ps.setLong(3, Util.Time());
      // ps.executeUpdate();
      // ps.close();
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

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(HttpServletRequest request, String token, String uid, String data) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    if(uid=="" || data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    JSONObject param = Util.JsonDecode(data);
    String tel = param.containsKey("tel")?String.valueOf(param.get("tel")).trim():"";
    String passwd = param.containsKey("passwd")?String.valueOf(param.get("passwd")).trim():"";
    // 验证
    if(!Safety.IsRight("tel", tel)){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "手机号码有误!");
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
    // 更新
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("tel", tel);
    if(!passwd.equals("")) uData.put("password", Hash.Md5(passwd));
    m.Set(uData);
    m.Where("id=?", uid);
    if(m.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "更新失败!");
    }
    return GetJSON(res);
  }

  /* 删除 */
  @RequestMapping("del")
  String Del(HttpServletRequest request, String token, String data) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
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
    JSONArray param = Util.JsonDecodeArray(data);
    String ids = Util.Implode(",", JSONArray.parseArray(param.toJSONString()));
    // 执行
    User m1 = new User();
    m1.Where("id in("+ids+")");
    UserInfo m2 = new UserInfo();
    m2.Where("uid in("+ids+")");
    SysPerm m3 = new SysPerm();
    m3.Where("uid in("+ids+")");
    ApiPerm m4 = new ApiPerm();
    m4.Where("uid in("+ids+")");
    if(m1.Delete() && m2.Delete() && m3.Delete() && m4.Delete()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "删除失败!");
    }
    return GetJSON(res);
  }

  /* 状态 */
  @RequestMapping("state")
  String State(HttpServletRequest request, String token, String uid,  String state) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    HashMap<String, Object> tData = AdminToken.Token(token);
    // 参数
    state = state=="1"?"1":"0";
    if(uid==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 超级管理员
    if(uid.equals("1") && !tData.get("uid").equals("1") ){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "您不是超级管理员!");
      return GetJSON(res);
    }
    // 更新
    User m = new User();
    HashMap<String, Object> uData = new HashMap<String, Object>();
    uData.put("state", state);
    m.Set(uData);
    m.Where("id=?", uid);
    if(m.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "更新失败!");
    }
    return GetJSON(res);
  }

  /* 权限 */
  @RequestMapping("perm")
  String Perm(HttpServletRequest request, String token, Integer uid, String type, Integer role, String perm) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    HashMap<String, Object> tData = AdminToken.Token(token);
    // 参数
    if(uid==null || type.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 超级管理员
    if(uid.equals(1) && !tData.get("uid").equals("1") ){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "您不是超级管理员!");
      return GetJSON(res);
    }
    // 类型
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("role", role);
    uData.put("perm", perm);
    uData.put("utime", Util.Time());
    if(type.equals("admin")) {
      // 系统权限
      SysPerm m = new SysPerm();
      m.Set(uData);
      m.Where("uid=?", uid);
      if(m.Update()){
        // 角色权限
        if(perm.isEmpty()) {
          SysRole m1 = new SysRole();
          m1.Columns("perm");
          m1.Where("id=?", role);
          HashMap<String, Object> data = m1.FindFirst();
          perm = data.containsKey("perm")?data.get("perm").toString():"";
        }
        // 更新权限
        _setPerm(Env.admin_token_prefix+"_perm_"+String.valueOf(uid), perm);
        res = new HashMap<String,Object>();
        res.put("code", 0);
        res.put("msg", "成功");
        return GetJSON(res);
      } else {
        res = new HashMap<String,Object>();
        res.put("code", 5000);
        res.put("msg", "更新失败!");
        return GetJSON(res);
      }
    } else if(type.equals("api")) {
      // API权限
      ApiPerm m = new ApiPerm();
      m.Set(uData);
      m.Where("uid=?", uid);
      if(m.Update()){
        // 角色权限
        if(perm.isEmpty()) {
          ApiRole m1 = new ApiRole();
          m1.Columns("perm");
          m1.Where("id=?", role);
          HashMap<String, Object> data = m1.FindFirst();
          perm = data.containsKey("perm")?data.get("perm").toString():"";
        }
        // 更新权限
        _setPerm(Env.api_token_prefix+"_perm_"+String.valueOf(uid), perm);
        res = new HashMap<String,Object>();
        res.put("code", 0);
        res.put("msg", "成功");
        return GetJSON(res);
      } else {
        res = new HashMap<String,Object>();
        res.put("code", 5000);
        res.put("msg", "更新失败!");
        return GetJSON(res);
      }
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
  }
  // 更新权限
  private void _setPerm(String key, String perm) {
    Redis redis = new Redis("");
    redis.Set(key, perm);
    redis.Close();
  }

  /* 个人信息 */
  @RequestMapping("info")
  String Info(HttpServletRequest request, String token, String uid, String data) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    if(uid=="" || data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    JSONObject param = Util.JsonDecode(data);
    HashMap<String,Object> info = new HashMap<String,Object>();
    info.put("nickname", param.containsKey("nickname")?String.valueOf(param.get("nickname")).trim():"");
    info.put("name", param.containsKey("name")?String.valueOf(param.get("name")).trim():"");
    info.put("gender", param.containsKey("gender")?String.valueOf(param.get("gender")).trim():"");
    info.put("birthday", param.containsKey("birthday")?Util.Strtotime(param.get("birthday").toString(), "yyyy-MM-dd"):0);
    info.put("position", param.containsKey("position")?String.valueOf(param.get("position")).trim():"");
    // 执行
    UserInfo m = new UserInfo();
    m.Set(info);
    m.Where("uid=?", uid);
    if(m.Update()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "更新失败!");
    }
    return GetJSON(res);
  }
  
}
