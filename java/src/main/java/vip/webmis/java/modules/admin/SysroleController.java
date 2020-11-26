package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.model.UserRole;

/* 用户角色 */
@RestController
@Controller("SysRoleController")
@RequestMapping("/admin/Sysrole")
public class SysroleController extends Base {

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String data, int page, int limit) throws Exception {
    // 验证
    AdminToken.urlVerify(token, "SysRole");
    // 搜索
    JSONObject json = Inc.json_decode(data);
    String role = json.containsKey("role")?String.valueOf(json.get("role")).trim():"";
    String where = "role LIKE '%:role:%'";
    JSONObject bind = new JSONObject();
    bind.put("role",role);
    // 查询
    UserRole model = new UserRole();
    model.where(where,bind);
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
      tmp = String.valueOf(val.get("ctime"));
      time = !tmp.equals("null")?Inc.date("yyyy-MM-dd HH:mm:ss",Long.valueOf(tmp)):"";
      val.put("ctime", time);
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
    // 验证
    AdminToken.urlVerify(token,"SysMenusAction");
    // 参数
    JSONObject json = Inc.json_decode(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 数据
    UserRole model = new UserRole();
    model.role = json.containsKey("role")?json.get("role").toString().trim():"";
    // 结果
    if(model.create()){
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
  String edit(String token, int id, String data) throws Exception {
    HashMap<String, Object> _res;
    JSONObject bind;
    // 验证
    AdminToken.urlVerify(token, "SysMenusAction");
    // 参数
    JSONObject json = Inc.json_decode(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 数据
    UserRole model = new UserRole();
    model.role = json.containsKey("role")?json.get("role").toString().trim():"";
    bind = new JSONObject();
    bind.put("id",id);
    model.where("id=:id:",bind);
    model.uField("name,action,perm,ico");
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
    AdminToken.urlVerify(token, "SysMenusAction");
    // 参数
    JSONArray req = Inc.json_decode_array(data);
    if(req==null || req.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // ID
    String ids = Inc.implode(",",req);
    bind = new JSONObject();
    bind.put("ids",ids);
    UserRole model = new UserRole();
    model.where("id in(:ids:)",bind);
    // 结果
    if(model.delete()){
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

}