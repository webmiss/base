package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

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
    HashMap<String, Object> bind = new HashMap<String, Object>();
    bind.put("uname",uname);
    // 查询
    HashMap<String, Object> params = new HashMap<String, Object>();
    params.put("table", "user as a LEFT JOIN user_info as b ON a.id=b.uid");
    params.put("columns", "a.id as uid,a.uname as uname,a.email as email,a.tel as tel,a.state as state,"
        + "a.rtime as rtime,a.ltime as ltime,a.utime as utime,"
        + "b.nickname as nickname,b.position as position,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img");
    params.put("order", "a.id DESC");
    params.put("where", where);
    params.put("bind", bind);
    // 统计
    HashMap<String, Object> cparams = new HashMap<String, Object>(params);
    int total = new User().count(cparams);
    // 分页
    String start = String.valueOf((page - 1) * limit);
    params.put("limit", start + "," + String.valueOf(limit));
    // 数据
    ArrayList<HashMap<String, Object>> list = new User().find(params);
    // 状态
    for (HashMap<String, Object> val : list) {
      val.put("state", val.get("state").equals("1") ? true : false);
      val.put("uid", val.get("uid").toString());
      val.put("img", val.get("img") != null && !val.get("img").equals("") ? Env.base_url + String.valueOf(val.get("img")) : "");
      val.put("birthday", val.get("birthday") != null ? String.valueOf(val.get("birthday")) : "");
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
    // 验证
    AdminToken.urlVerify(token, "SysUser");
    HashMap<String, Object> _res;
    HashMap<String, Object> params;
    HashMap<String, Object> bind;
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
    bind = new HashMap<String, Object>();
    bind.put("tel",tel);
    params = new HashMap<String, Object>();
    params.put("where","tel=:tel:");
    params.put("bind",bind);
    HashMap<String, Object> res = new User().findFirst(params);
    if(!res.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "该用户已存在!");
      return getJSON(_res);
    }
    // 保存
    params = new HashMap<String, Object>();
    params.put("id",Data.getId());
    params.put("tel",tel);
    params.put("password",passwd);
    params.put("rtime",Inc.date("yyyy-MM-dd HH:mm:ss"));
    // 结果
    if(new User().insert(params)==0){
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
    // 验证
    AdminToken.urlVerify(token, "SysUser");
    HashMap<String, Object> _res;
    HashMap<String, Object> params;
    HashMap<String, Object> uData;
    HashMap<String, Object> bind;
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
    bind = new HashMap<String, Object>();
    bind.put("tel",tel);
    params = new HashMap<String, Object>();
    params.put("where","tel=:tel:");
    params.put("bind",bind);
    HashMap<String, Object> res = new User().findFirst(params);
    if(!res.isEmpty()){
      // 更新密码
      if(passwd!=""){
        uData = new HashMap<String, Object>();
        uData.put("password",passwd);
        bind = new HashMap<String, Object>();
        bind.put("uid",uid);
        params = new HashMap<String, Object>();
        params.put("data",uData);
        params.put("where","id=:uid:");
        params.put("bind",bind);
        if(new User().update(params)){
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
    uData = new HashMap<String, Object>();
    uData.put("tel",tel);
    if(passwd!="") uData.put("password",passwd);
    bind = new HashMap<String, Object>();
    bind.put("uid",uid);
    params = new HashMap<String, Object>();
    params.put("data",uData);
    params.put("where","id=:uid:");
    params.put("bind",bind);
    // 结果
    if(new User().update(params)){
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
    // 验证
    AdminToken.urlVerify(token, "SysUser");
    HashMap<String, Object> _res;
    HashMap<String, Object> bind;
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
    bind = new HashMap<String, Object>();
    bind.put("uid",ids);
    HashMap<String, Object> user = new HashMap<String, Object>();
    user.put("where","id in(:uid:)");
    user.put("bind",bind);
    HashMap<String, Object> uinfo = new HashMap<String, Object>();
    uinfo.put("where","uid in(:uid:)");
    uinfo.put("bind",bind);
    // 结果
    if(new User().delete(user) && new UserInfo().delete(uinfo)){
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
    // 验证
    AdminToken.urlVerify(token, "SysUser");
    HashMap<String, Object> _res;
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
    HashMap<String, Object> uData = new HashMap<String, Object>();
    uData.put("state",state.equals("1")?"1":"0");
    HashMap<String, Object> bind = new HashMap<String, Object>();
    bind.put("uid",uid);
    HashMap<String, Object> params = new HashMap<String, Object>();
    params.put("data",uData);
    params.put("where","id=:uid:");
    params.put("bind",bind);
    // 结果
    if(new User().update(params)){
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
    // 验证
    HashMap<String, Object> tokenData = AdminToken.urlVerify(token, "SysUser");
    HashMap<String, Object> _res;
    HashMap<String, Object> params;
    HashMap<String, Object> uData;
    HashMap<String, Object> bind;
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
    bind = new HashMap<String, Object>();
    bind.put("uid",uid);
    params = new HashMap<String, Object>();
    params.put("where","uid=:uid:");
    params.put("bind",bind);
    HashMap<String, Object> info = new UserInfo().findFirst(params);
    // 数据
    uData = new HashMap<String, Object>();
    Set<String> arr = new HashSet<String>();
    arr.add("uid");
    Set<String> keys = req.keySet();
    for(String key : keys){
      if(arr.contains(key)) continue;
      uData.put(key,String.valueOf(req.get(key)).trim());
    }
    if(uData.get("birthday").equals("")) uData.put("birthday","null");
    // 是否存在
    if(info.isEmpty()){
      uData.put("uid",uid);
      new UserInfo().insert(uData);
    }else{
      params = new HashMap<String, Object>();
      params.put("data",uData);
      params.put("where","uid=:uid:");
      params.put("bind",bind);
      new UserInfo().update(params);
    }
    // 结果
    _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    return getJSON(_res);
  }

}