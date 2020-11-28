package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Data;
import vip.webmis.java.common.Inc;
import vip.webmis.java.model.Model;
import vip.webmis.java.model.User;
import vip.webmis.java.model.UserInfo;
import vip.webmis.java.model.UserPerm;

/* 用户管理 */
@RestController
@Controller("SysUserController")
@RequestMapping("/admin/Sysuser")
public class SysuserController extends Base {

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String data, int page, int limit) throws Exception {
    // 验证
    AdminToken.urlVerify(token, "SysUser");
    // 搜索
    JSONObject json = Inc.json_decode(data);
    String uname = json.containsKey("uname")?String.valueOf(json.get("uname")).trim():"";
    String where = "a.uname LIKE \"%:uname:%\" OR a.tel LIKE \"%:uname:%\" OR a.email LIKE \"%:uname:%\"";
    JSONObject bind = new JSONObject();
    bind.put("uname",uname);
    // 查询
    User model = new User();
    model.table("user AS a LEFT JOIN user_info AS b ON a.id=b.uid LEFT JOIN user_perm AS c ON a.id=c.uid");
    model.columns(
      "a.id AS uid, a.uname, a.email, a.tel, a.state, a.rtime, a.ltime, a.utime,"+
      "b.nickname, b.position, b.name, b.gender, b.birthday, b.img,"+
      "c.role, c.state_admin, c.state_app, c.perm"
    );
    model.where(where,bind);
    model.order("a.id DESC");
    // 统计
    int total = model.count();
    // 分页
    String start = String.valueOf((page-1)*limit);
    model.limit(start+","+String.valueOf(limit));
    // 数据
    ArrayList<HashMap<String, Object>> list = model.find();
    // 状态
    String tmp = "";
    String time = "";
    for (HashMap<String, Object> val : list) {
      val.put("state", val.get("state").equals("1")?true:false);
      val.put("state_admin", val.get("state_admin").equals("1")?true:false);
      val.put("state_app", val.get("state_app").equals("1")?true:false);
      val.put("uid", val.get("uid").toString());
      val.put("img", val.get("img")!=null&&!val.get("img").equals("")?Env.base_url + String.valueOf(val.get("img")):"");
      val.put("birthday", val.get("birthday")!=null?String.valueOf(val.get("birthday")):"");
      tmp = String.valueOf(val.get("rtime"));
      time = !tmp.equals("null")?Inc.date("yyyy-MM-dd HH:mm:ss",Long.valueOf(tmp)):"";
      val.put("rtime", time);
      tmp = String.valueOf(val.get("ltime"));
      time = !tmp.equals("null")?Inc.date("yyyy-MM-dd HH:mm:ss",Long.valueOf(tmp)):"";
      val.put("ltime", time);
      tmp = String.valueOf(val.get("utime"));
      time = !tmp.equals("null")?Inc.date("yyyy-MM-dd HH:mm:ss",Long.valueOf(tmp)):"";
      val.put("utime", time);
    }
    // 返回数据
    HashMap<String, Object> _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    _res.put("list", list);
    _res.put("total", total);
    return getJSON(_res);
  }

  /* 添加 */
  @RequestMapping("/add")
  String add(String token, String data) throws Exception {
    HashMap<String, Object> _res;
    JSONObject bind;
    // 验证
    AdminToken.urlVerify(token,"SysUser");
    // 参数
    JSONObject json = Inc.json_decode(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    String id = Data.getId();
    String tel = json.containsKey("tel")&&!json.get("tel").equals("")?String.valueOf(json.get("tel")).trim():"";
    String passwd = json.containsKey("passwd")&&!json.get("passwd").equals("")?Inc.md5(json.get("passwd").toString()):"";
    // 手机号码
    if(tel.equals("")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "请输入手机号码!");
      return getJSON(_res);
    }
    // 是否存在
    User user = new User();
    bind = new JSONObject();
    bind.put("tel",tel);
    user.where("tel=:tel:",bind);
    HashMap<String, Object> res = user.findFirst();
    if(!res.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "该用户已存在!");
      return getJSON(_res);
    }
    // 事务
    Model model = new Model();
    model.begin();
    // 用户
    User m1 = new User();
    m1.id = id;
    m1.tel = tel;
    m1.password = passwd;
    // 信息
    UserInfo m2 = new UserInfo();
    m2.uid = id;
    // 权限
    UserPerm m3 = new UserPerm();
    m3.uid = id;
    // 结果
    if(m1.create() && m2.create() && m3.create()){
      model.commit();
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
      model.commit();
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "添加失败!");
      return getJSON(_res);
    }
  }

  /* 编辑 */
  @RequestMapping("/edit")
  String edit(String token, String uid, String data) throws Exception {
    HashMap<String, Object> _res;
    JSONObject bind;
    // 验证
    AdminToken.urlVerify(token, "SysUser");
    // 参数
    JSONObject json = Inc.json_decode(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    uid = uid.trim();
    String tel = json.containsKey("tel")&&!json.get("tel").equals("")?String.valueOf(json.get("tel")).trim():"";
    String passwd = json.containsKey("passwd")&&!json.get("passwd").equals("")?Inc.md5(json.get("passwd").toString()):"";
    // 手机号码
    if(tel.equals("")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "请输入手机号码!");
      return getJSON(_res);
    }
    // 是否存在
    User m1 = new User();
    bind = new JSONObject();
    bind.put("tel",tel);
    m1.where("tel=\":tel:\"",bind);
    HashMap<String, Object> res = m1.findFirst();
    User model = new User();
    if(!res.isEmpty()){
      model.password = !passwd.equals("")?passwd:res.get("password").toString();
      model.uField("password");
      model.where("tel=':tel:'",bind);
    }else{
      model.tel = tel;
      model.password = passwd;
      model.uField("tel,password");
      bind = new JSONObject();
      bind.put("id",uid);
      model.where("id=:id:",bind);
    }
    // 结果
    if(model.update()){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "编辑失败!");
      return getJSON(_res);
    }
  }

  /* 删除 */
  @RequestMapping("/delete")
  String delete(String token, String data) throws Exception {
    HashMap<String, Object> _res;
    JSONObject bind;
    // 验证
    AdminToken.urlVerify(token, "SysUser");
    // 参数
    JSONArray json = Inc.json_decode_array(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 管理员
    if(json.contains("1") || json.contains(1)){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "无法删除系统管理员!");
      return getJSON(_res);
    }
    // ID
    String ids = Inc.implode(",",json);
    bind = new JSONObject();
    bind.put("uid",ids);
    User user = new User();
    user.where("id in(:uid:)",bind);
    UserInfo uinfo = new UserInfo();
    uinfo.where("uid in(:uid:)",bind);
    UserPerm perm = new UserPerm();
    perm.where("uid in(:uid:)",bind);
    // 结果
    Model model = new Model();
    model.begin();
    if(user.delete() && uinfo.delete() && perm.delete()){
      model.commit();
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
      model.commit();
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "删除失败!");
      return getJSON(_res);
    }
  }

  /* 状态 */
  @RequestMapping("/state")
  String state(String token, String uid, String type, String state) throws Exception {
    HashMap<String, Object> _res;
    JSONObject bind;
    boolean suc;
    // 验证
    AdminToken.urlVerify(token,"SysUser");
    // 参数
    uid = uid.trim();
    type = type.trim();
    state = state.trim();
    // 管理员
    if(uid.equals("1")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "禁止修改系统管理员");
      return getJSON(_res);
    }
    // 更改
    state = state.equals("1")?"1":"0";
    bind = new JSONObject();
    bind.put("uid",uid);
    if(type.equals("state")){
      User model = new User();
      model.state = state;
      model.uField("state");
      model.where("id=:uid:",bind);
      suc = model.update();
    }else if(type.equals("state_admin")){
      UserPerm model = new UserPerm();
      model.state_admin = state;
      model.uField("state_admin");
      model.where("uid=:uid:",bind);
      suc = model.update();
    }else if(type.equals("state_app")){
      UserPerm model = new UserPerm();
      model.state_app = state;
      model.uField("state_app");
      model.where("uid=:uid:",bind);
      suc = model.update();
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "未知类型!");
      return getJSON(_res);
    }
    // 结果
    if(suc){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "更新失败");
      return getJSON(_res);
    }
  }

  /* 用户信息 */
  @RequestMapping("/info")
  String info(String token, String uid, String data) throws Exception {
    HashMap<String, Object> _res;
    JSONObject bind;
    // 验证
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token, "SysUser");
    // 参数
    JSONObject json = Inc.json_decode(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    uid = uid.trim();
    // 管理员
    if(!tokenData.get("uid").equals("1") && uid.equals("1")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "非系统管理员!");
      return getJSON(_res);
    }
    // 数据
    UserInfo model = new UserInfo();
    model.nickname = String.valueOf(json.get("nickname")).trim();
    model.name = String.valueOf(json.get("name")).trim();
    model.gender = String.valueOf(json.get("gender")).trim();
    model.birthday = String.valueOf(json.get("birthday")).trim();
    model.position = String.valueOf(json.get("position")).trim();
    model.uField("utime,nickname,name,gender,birthday,position");
    bind = new JSONObject();
    bind.put("uid",uid);
    model.where("uid=:uid:",bind);
    // 结果
    if(model.update()){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "更新失败!");
      return getJSON(_res);
    }
  }

}