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
import org.springframework.web.bind.annotation.RequestBody;
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
import webmis.util.Type;
import webmis.util.Util;

@RestController
@Controller("AdminSysUser")
@RequestMapping("/admin/sys_user")
public class SysUser extends Base {

  private static String where;
  private static Object[] whereData;

  /* 列表 */
  @RequestMapping("list")
  String List(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String data = JsonName(json, "data");
    int page = Integer.valueOf(JsonName(json, "page"));
    int limit = Integer.valueOf(JsonName(json, "limit"));
    String order = JsonName(json, "order");
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
    whereData = getWhere(param);
    // 统计
    User m = new User();
    m.Columns("count(*) AS num");
    m.Table("user as a");
    m.LeftJoin("user_info as b", "a.id=b.uid");
    m.Where(where, whereData);
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Table("user as a");
    m.LeftJoin("user_info as b", "a.id=b.uid");
    m.LeftJoin("sys_perm as c", "a.id=c.uid");
    m.LeftJoin("api_perm as d", "a.id=d.uid");
    m.Columns(
      "a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
      "b.nickname", "b.position", "b.name", "b.gender", "b.img", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday",
      "c.role AS sys_role", "c.perm AS sys_perm",
      "d.role AS api_role", "d.perm AS api_perm"
    );
    m.Where(where, whereData);
    m.Order(!order.equals("")?order:"a.id DESC");
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
    res.put("total", Type.Int(total.get("num")));
    return GetJSON(res);
  }
  /* 搜索条件 */
  private Object[] getWhere(JSONObject param) {
    // 参数
    String uname = param.containsKey("uname")?String.valueOf(param.get("uname")).trim():"";
    String nickname = param.containsKey("nickname")?String.valueOf(param.get("nickname")).trim():"";
    String name = param.containsKey("name")?String.valueOf(param.get("name")).trim():"";
    String department = param.containsKey("department")?String.valueOf(param.get("department")).trim():"";
    String position = param.containsKey("position")?String.valueOf(param.get("position")).trim():"";
    // 条件
    where = "(a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?) AND b.nickname LIKE ? AND b.name LIKE ? AND b.department LIKE ? AND b.position LIKE ?";
    Object[] whereData = {"%"+uname+"%", "%"+uname+"%", "%"+uname+"%", "%"+nickname+"%", "%"+name+"%", "%"+department+"%", "%"+position+"%"};
    return whereData;
  }

  /* 添加 */
  @RequestMapping("add")
  String Add(@RequestBody JSONObject json, HttpServletRequest request) throws SQLException {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String data = JsonName(json, "data");
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
    Object[] sql;
    PreparedStatement ps;
    long uid = Data.Mist("ID");
    Connection conn = m.DBConn();
    HashMap<String, Object> uData;
    try {
      conn.setAutoCommit(false);
      // 用户
      User m1 = new User();
      uData = new HashMap<String, Object>();
      uData.put("id", uid);
      uData.put("tel", tel);
      uData.put("password", Hash.Md5(passwd));
      m1.Values(uData);
      sql = m1.InsertSQL();
      ps = m1.Bind(conn, sql[0], sql[1]);
      ps.executeUpdate();
      ps.close();
      // 详情
      UserInfo m2 = new UserInfo();
      uData = new HashMap<String, Object>();
      uData.put("uid", uid);
      m2.Values(uData);
      sql = m2.InsertSQL();
      ps = m2.Bind(conn, sql[0], sql[1]);
      ps.executeUpdate();
      ps.close();
      // 权限-System
      SysPerm m3 = new SysPerm();
      uData = new HashMap<String, Object>();
      uData.put("uid", uid);
      uData.put("role", 1);
      uData.put("utime", Util.Time());
      m3.Values(uData);
      sql = m3.InsertSQL();
      ps = m3.Bind(conn, sql[0], sql[1]);
      ps.executeUpdate();
      ps.close();
      // 权限-Api
      ApiPerm m4 = new ApiPerm();
      uData = new HashMap<String, Object>();
      uData.put("uid", uid);
      uData.put("role", 1);
      uData.put("utime", Util.Time());
      m4.Values(uData);
      sql = m4.InsertSQL();
      ps = m4.Bind(conn, sql[0], sql[1]);
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

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String uid = JsonName(json, "uid");
    String data = JsonName(json, "data");
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
    if(user.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "该用户不存在!");
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
  String Del(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String data = JsonName(json, "data");
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
  String State(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String uid = JsonName(json, "uid");
    String state = JsonName(json, "state");
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
  String Perm(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String type = JsonName(json, "type");
    String uid = JsonName(json, "uid");
    String role = JsonName(json, "role");
    String perm = JsonName(json, "perm");
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
    if(uid.equals("1") && !tData.get("uid").equals("1") ){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "您不是超级管理员!");
      return GetJSON(res);
    }
    // 类型
    if(type.equals("admin") && _permSys(uid, role, perm)) {
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
      return GetJSON(res);
    } else if(type.equals("api") && _permApi(uid, role, perm)) {
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
  }
  // 权限-System
  private boolean _permSys(String uid, String role, String perm) {
    // 数据
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("role", role);
    uData.put("perm", perm);
    uData.put("utime", Util.Time());
    // 模型
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
      return _setPerm(Env.admin_token_prefix+"_perm_"+String.valueOf(uid), perm);
      
    }
    return false;
  }
  // 权限-Api
  private boolean _permApi(String uid, String role, String perm) {
    // 数据
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("role", role);
    uData.put("perm", perm);
    uData.put("utime", Util.Time());
    // 模型
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
      return _setPerm(Env.api_token_prefix+"_perm_"+String.valueOf(uid), perm);
    }
    return false;
  }
  // 更新权限
  private boolean _setPerm(String key, String perm) {
    Redis redis = new Redis("");
    redis.Set(key, perm);
    redis.Close();
    return true;
  }

  /* 个人信息 */
  @RequestMapping("info")
  String Info(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String uid = JsonName(json, "uid");
    String data = JsonName(json, "data");
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
    info.put("birthday", param.containsKey("birthday")?Util.StrToTime(param.get("birthday").toString(), "yyyy-MM-dd"):0);
    info.put("department", param.containsKey("department")?String.valueOf(param.get("department")).trim():"");
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
