package webmis.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.model.SysMenu;
import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.util.Util;

@RestController
@Controller("AdminSysRole")
@RequestMapping("/admin/sysrole")
public class SysRole extends Base {

  private static HashMap<String, ArrayList<HashMap<String, Object>>> menus = null;  //全部菜单
  private static HashMap<String, Integer> permAll = null;                           //用户权限

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
    String name = param.containsKey("name")?String.valueOf(param.get("name")).trim():"";
    // 统计
    webmis.model.SysRole m = new webmis.model.SysRole();
    m.Columns("count(*) AS num");
    m.Where("name LIKE ?", "%"+name+"%");
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Columns("id", "name", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "perm");
    m.Where("name LIKE ?", "%"+name+"%");
    m.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = m.Find();
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
  String Add(HttpServletRequest request, String token, String data) {
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
    String name = param.containsKey("name")?String.valueOf(param.get("name")).trim():"";
    if(name.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 数据
    webmis.model.SysRole m = new webmis.model.SysRole();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("name", name);
    uData.put("ctime", Util.Time());
    m.Values(uData);
    if(m.Insert()){
      res = new HashMap<String,Object>();
      res.put("code", 0);
      res.put("msg", "成功");
    } else {
      res = new HashMap<String,Object>();
      res.put("code", 5000);
      res.put("msg", "添加失败!");
    }
    return GetJSON(res);
  }

  /* 编辑 */
  @RequestMapping("edit")
  String Edit(HttpServletRequest request, String token, String id, String data) {
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
    if(id=="" || data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    JSONObject param = Util.JsonDecode(data);
    String name = param.containsKey("name")?String.valueOf(param.get("name")).trim():"";
    if(name.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 数据
    webmis.model.SysRole m = new webmis.model.SysRole();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("name", name);
    uData.put("utime", Util.Time());
    m.Set(uData);
    m.Where("id=?", id);
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
    JSONArray param = Util.JsonDecodeArray(data);
    String ids = Util.Implode(",", JSONArray.parseArray(param.toJSONString()));
    // 执行
    webmis.model.SysRole m = new webmis.model.SysRole();
    m.Where("id in("+ids+")");
    if(m.Delete()){
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

  /* 权限 */
  @RequestMapping("perm")
  String Perm(HttpServletRequest request, String token, Integer id, String perm) {
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
    if(id==null){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    webmis.model.SysRole m = new webmis.model.SysRole();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("perm", perm);
    uData.put("utime", Util.Time());
    m.Set(uData);
    m.Where("id=?", id);
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
  @RequestMapping("permList")
  String PermList(HttpServletRequest request, String token, String perm) {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 全部菜单
    ArrayList<HashMap<String, Object>> tmp;
    menus = new HashMap<String, ArrayList<HashMap<String, Object>>>();
    SysMenu model = new SysMenu();
    model.Columns("id", "fid", "title", "url", "ico", "controller", "action");
    model.Order("sort DESC, id");
    ArrayList<HashMap<String, Object>> all = model.Find();
    for (HashMap<String, Object> val : all) {
      String fid = String.valueOf(val.get("fid"));
      if (menus.containsKey(fid)) {
        menus.get(fid).add(val);
      } else {
        tmp = new ArrayList<HashMap<String, Object>>();
        tmp.add(val);
        menus.put(fid,tmp);
      }
    }
    // 用户权限
    permAll = permArr(perm);
    Print(permAll);
    // 权限列表
    ArrayList<HashMap<String, Object>> lists = new ArrayList<HashMap<String, Object>>();
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", lists);
    return GetJSON(res);
  }
  // 权限-拆分
  private HashMap<String, Integer> permArr(String perm) {
    HashMap<String, Integer> permAll = new HashMap<String, Integer>();
    ArrayList<String> arr = Util.Explode(" ", perm);
    ArrayList<String> s;
    for(String val : arr){
      s = Util.Explode(":", val);
      permAll.put(s.get(0), Integer.valueOf(s.get(1)));
    }
    return permAll;
  }
  
}
