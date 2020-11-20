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
import vip.webmis.java.library.Safety;
import vip.webmis.java.model.User;
import vip.webmis.java.model.UserInfo;

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
    JSONObject req = Inc.json_decode(data);
    String uname = String.valueOf(req.get("uname")).trim();
    String where = "a.uname LIKE \"%:uname:%\" OR a.tel LIKE \"%:uname:%\" OR a.email LIKE \"%:uname:%\"";
    JSONObject bind = new JSONObject();
    bind.put("uname",uname);
    // 查询
    User model = new User();
    model.table("user as a LEFT JOIN user_info as b ON a.id=b.uid");
    model.columns(
      "a.id as uid,a.uname as uname,a.email as email,a.tel as tel,a.state as state," +
      "a.rtime as rtime,a.ltime as ltime,a.utime as utime," +
      "b.nickname as nickname,b.position as position,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img"
    );
    model.order("a.id DESC");
    model.where(where,bind);
    // 统计
    int total = model.count();
    // 分页
    String start = String.valueOf((page-1)*limit);
    model.limit(start+","+String.valueOf(limit));
    // 数据
    ArrayList<HashMap<String, Object>> list = model.find();
    // 状态
    for (HashMap<String, Object> val : list) {
      val.put("state", val.get("state").equals("1")?true:false);
      val.put("uid", val.get("uid").toString());
      val.put("img", val.get("img")!=null&&!val.get("img").equals("")?Env.base_url + String.valueOf(val.get("img")):"");
      val.put("birthday", val.get("birthday")!=null?String.valueOf(val.get("birthday")):"");
      long rtime = Inc.time("yyyy-MM-dd HH:mm:ss",String.valueOf(val.get("rtime")));
      val.put("rtime", rtime>0?Inc.date("yyyy-MM-dd HH:mm:ss",rtime):"");
      long ltime = Inc.time("yyyy-MM-dd HH:mm:ss",String.valueOf(val.get("ltime")));
      val.put("ltime", ltime>0?Inc.date("yyyy-MM-dd HH:mm:ss",ltime):"");
      long utime = Inc.time("yyyy-MM-dd HH:mm:ss",String.valueOf(val.get("utime")));
      val.put("utime", utime>0?Inc.date("yyyy-MM-dd HH:mm:ss",utime):"");
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
    JSONObject req = Inc.json_decode(data);
    if(req==null || !req.containsKey("tel") || req.get("tel").equals("")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    String tel = req.get("tel").toString().trim();
    String passwd = !req.get("passwd").equals("")?Inc.md5(req.get("passwd").toString()):Inc.md5("123456");
    // 验证手机
    if(!Safety.isRight("tel",tel)){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "手机号码有误!");
      return getJSON(_res);
    }
    // 是否存在
    User m1 = new User();
    bind = new JSONObject();
    bind.put("tel",tel);
    m1.where("tel=:tel:",bind);
    HashMap<String, Object> res = m1.findFirst();
    if(!res.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "该用户已存在!");
      return getJSON(_res);
    }
    // 保存
    User m2 = new User();
    m2.id = Data.getId();
    m2.tel = tel;
    m2.password = passwd;
    // 结果
    if(m2.create()){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
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
    JSONObject req = Inc.json_decode(data);
    if(req==null || !req.containsKey("tel") || req.get("tel").equals("")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    uid = uid.trim();
    String tel = req.get("tel").toString().trim();
    String passwd = !req.get("passwd").equals("")?Inc.md5(req.get("passwd").toString()):"";
    // 验证手机
    if(!Safety.isRight("tel",tel)){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "手机号码有误!");
      return getJSON(_res);
    }
    // 是否存在
    User m1 = new User();
    bind = new JSONObject();
    bind.put("tel",tel);
    m1.where("tel=:tel:",bind);
    HashMap<String, Object> res = m1.findFirst();
    if(!res.isEmpty()){
      // 更新密码
      if(passwd!=""){
        User m2 = new User();
        m2.password = passwd;
        m2.uField("password,utime");
        bind = new JSONObject();
        bind.put("uid",uid);
        m2.where("id=:uid:",bind);
        if(m2.update()){
          _res = new HashMap<String, Object>();
          _res.put("code", 0);
          _res.put("msg", "成功");
          return getJSON(_res);
        }else{
          _res = new HashMap<String, Object>();
          _res.put("code", 5000);
          _res.put("msg", "更新密码失败!");
          return getJSON(_res);
        }
      }else{
        _res = new HashMap<String, Object>();
        _res.put("code", 4000);
        _res.put("msg", "密码为6-16位字符!");
        return getJSON(_res);
      }
    }
    // 修改手机
    User m3 = new User();
    m3.tel = tel;
    if(passwd!=""){
      m3.password = passwd;
      m3.uField("tel,password,utime");
    }else{
      m3.uField("tel,utime");
    }
    bind = new JSONObject();
    bind.put("uid",uid);
    m3.where("id=:uid:",bind);
    // 结果
    if(m3.update()){
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
    JSONArray req = Inc.json_decode_array(data);
    if(req==null){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 管理员
    if(req.contains("1") || req.contains(1)){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "无法删除系统管理员!");
      return getJSON(_res);
    }
    // ID
    String ids = Inc.implode(",",req);
    bind = new JSONObject();
    bind.put("uid",ids);
    User m1 = new User();
    m1.where("id in(:uid:)",bind);
    UserInfo m2 = new UserInfo();
    m2.where("uid in(:uid:)",bind);
    // 结果
    if(m1.delete() && m2.delete()){
      _res = new HashMap<String, Object>();
      _res.put("code", 0);
      _res.put("msg", "成功");
      return getJSON(_res);
    }else{
      _res = new HashMap<String, Object>();
      _res.put("code", 5000);
      _res.put("msg", "删除失败!");
      return getJSON(_res);
    }
  }

  /* 状态 */
  @RequestMapping("/state")
  String state(String token, String uid, String state) throws Exception {
    HashMap<String, Object> _res;
    JSONObject bind;
    // 验证
    AdminToken.urlVerify(token,"SysUser");
    // 参数
    uid = uid.trim();
    state = state.trim();
    // 管理员
    if(uid.equals("1")){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "禁止修改系统管理员");
      return getJSON(_res);
    }
    // 更改
    User model = new User();
    model.state = state.equals("1")?"1":"0";
    model.uField("state,utime");
    bind = new JSONObject();
    bind.put("uid",uid);
    model.where("id=:uid:",bind);
    // 结果
    if(model.update()){
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
    boolean res;
    // 验证
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token, "SysUser");
    // 参数
    JSONObject req = Inc.json_decode(data);
    if(req==null){
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
    // 查询
    UserInfo m1 = new UserInfo();
    bind = new JSONObject();
    bind.put("uid",uid);
    m1.where("uid=:uid:",bind);
    HashMap<String, Object> info = m1.findFirst();
    // 数据
    String birthday = String.valueOf(req.get("birthday")).trim();
    UserInfo m2 = new UserInfo();
    m2.nickname = String.valueOf(req.get("nickname")).trim();
    m2.name = String.valueOf(req.get("name")).trim();
    m2.gender = String.valueOf(req.get("gender")).trim();
    m2.birthday = !birthday.equals("")?birthday:"null";
    m2.position = String.valueOf(req.get("position")).trim();
    if(info.isEmpty()){
      m2.uid = uid;
      res = m2.create();
    }else{
      m2.uField("utime,nickname,name,gender,birthday,position");
      m2.where("uid=:uid:",bind);
      res = m2.update();
    }
    // 结果
    if(res){
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