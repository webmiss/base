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
import vip.webmis.java.model.SysMenu;
import vip.webmis.java.model.SysMenuAction;

@RestController
@Controller("AdminSysMenusActionController")
@RequestMapping("/admin/Sysmenusaction")
public class SysmenusactionController extends Base {

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String data, int page, int limit) throws Exception {
    // 验证
    AdminToken.urlVerify(token, "SysMenusAction");
    // 搜索
    JSONObject json = Inc.json_decode(data);
    String name = json.containsKey("name")?String.valueOf(json.get("name")).trim():"";
    String action = json.containsKey("action")?String.valueOf(json.get("action")).trim():"";
    String where = "name LIKE \"%:name:%\" AND action LIKE \"%:action:%\"";
    JSONObject bind = new JSONObject();
    bind.put("name",name);
    bind.put("action",action);
    // 查询
    SysMenuAction model = new SysMenuAction();
    model.where(where,bind);
    // 统计
    int total = model.count();
    // 分页
    String start = String.valueOf((page-1)*limit);
    model.limit(start+","+String.valueOf(limit));
    // 数据
    ArrayList<HashMap<String, Object>> list = model.find();
    // 返回
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
    SysMenuAction model = new SysMenuAction();
    model.name = json.containsKey("name")?json.get("name").toString().trim():"";
    model.action = json.containsKey("action")?json.get("action").toString().trim():"";
    model.perm = json.containsKey("perm")?Integer.valueOf(json.get("perm").toString().trim()):0;
    model.ico = json.containsKey("ico")?json.get("ico").toString().trim():"";
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
    SysMenuAction model = new SysMenuAction();
    model.name = json.containsKey("name")?json.get("name").toString().trim():"";
    model.action = json.containsKey("action")?json.get("action").toString().trim():"";
    model.perm = json.containsKey("perm")?Integer.valueOf(json.get("perm").toString().trim()):0;
    model.ico = json.containsKey("ico")?json.get("ico").toString().trim():"";
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
    SysMenuAction model = new SysMenuAction();
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

  /* 获取[动作菜单] */
  @RequestMapping("/getAction")
  String getMenus(String token,String url) throws Exception {
    HashMap<String, Object> data;
    // 验证
    HashMap<String, Object> tokenData = AdminToken.verify(token);
    // 参数
    if(url.equals("")){
      data = new HashMap<String, Object>();
      data.put("code", 4000);
      data.put("msg", "获取动作不能为空!");
      return getJSON(data);
    }
    // 菜单ID
    SysMenu m1 = new SysMenu();
    JSONObject bind = new JSONObject();
    bind.put("url",url);
    m1.where("url=\":url:\"",bind);
    m1.columns("id");
    HashMap<String, Object> mid = m1.findFirst();
    if(mid.isEmpty()){
      data = new HashMap<String, Object>();
      data.put("code", 4000);
      data.put("msg", "获取 "+url+" 不存在!");
      return getJSON(data);
    }
    // 全部动作
    ArrayList<HashMap<String, Object>> action = new ArrayList<HashMap<String, Object>>();
    HashMap<String, Object> permAll = AdminToken.perm(tokenData.get("uid").toString());
    Integer perm = Integer.valueOf((String)permAll.get(String.valueOf(mid.get("id"))));
    SysMenuAction m2 = new SysMenuAction();
    m2.columns("name,action,ico,perm");
    ArrayList<HashMap<String, Object>> aMenus = m2.find();
    for(HashMap<String, Object> val : aMenus){
      // 匹配权限值
      if((perm&Integer.valueOf((String)val.get("perm")))>0){
        data = new HashMap<String, Object>();
        data.put("name",val.get("name"));
        data.put("action",val.get("action"));
        data.put("ico",val.get("ico"));
        action.add(data);
      }
    }
    // 返回数据
    data = new HashMap<String, Object>();
    data.put("code", 0);
    data.put("msg", "成功");
    data.put("action", action);
    return getJSON(data);
  }

}