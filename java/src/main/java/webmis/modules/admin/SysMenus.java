package webmis.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.model.SysMenu;
import webmis.service.AdminToken;
import webmis.util.Util;

/* 系统菜单 */
@RestController
@Controller("AdminSysMenus")
@RequestMapping("/admin/sysmenus")
public class SysMenus extends Base {

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
    String fid = param.containsKey("fid")?String.valueOf(param.get("fid")).trim():"";
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    String url = param.containsKey("url")?String.valueOf(param.get("url")).trim():"";
    // 统计
    webmis.model.SysMenu m = new webmis.model.SysMenu();
    m.Columns("count(*) AS num");
    m.Where("fid like ? AND title like ? AND url like ?", "%"+fid+"%", "%"+title+"%", "%"+url+"%");
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Columns("id", "fid", "title", "ico", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "sort", "url", "controller", "action");
    m.Where("fid like ? AND title like ? AND url like ?", "%"+fid+"%", "%"+title+"%", "%"+url+"%");
    m.Order("sort DESC", "fid");
    m.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = m.Find();
    // 数据
    for (HashMap<String, Object> val : list) {
      val.put("state", !val.get("action").equals("")?Util.JsonDecodeArray(val.get("action").toString()):"");
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
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    if(title.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 数据
    webmis.model.SysMenu m = new webmis.model.SysMenu();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("fid", param.containsKey("fid")?String.valueOf(param.get("fid")).trim():0);
    uData.put("title", title);
    uData.put("url", param.containsKey("url")?String.valueOf(param.get("url")).trim():"");
    uData.put("ico", param.containsKey("ico")?String.valueOf(param.get("ico")).trim():"");
    uData.put("sort", param.containsKey("sort")?String.valueOf(param.get("sort")).trim():0);
    uData.put("controller", param.containsKey("controller")?String.valueOf(param.get("controller")).trim():"");
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
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    if(title.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 数据
    webmis.model.SysMenu m = new webmis.model.SysMenu();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("fid", param.containsKey("fid")?String.valueOf(param.get("fid")).trim():0);
    uData.put("title", title);
    uData.put("url", param.containsKey("url")?String.valueOf(param.get("url")).trim():"");
    uData.put("ico", param.containsKey("ico")?String.valueOf(param.get("ico")).trim():"");
    uData.put("sort", param.containsKey("sort")?String.valueOf(param.get("sort")).trim():0);
    uData.put("controller", param.containsKey("controller")?String.valueOf(param.get("controller")).trim():"");
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
    webmis.model.SysMenu m = new webmis.model.SysMenu();
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

  /* 获取菜单 */
  @RequestMapping("getMenus")
  String GetMenus(String token) {
    HashMap<String,Object> res;
    ArrayList<HashMap<String, Object>> tmp;
    // 验证
    String msg = AdminToken.verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 全部菜单
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
    // 全部权限
    permAll = AdminToken.perm(token);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("menus", _getMenu("0"));
    return GetJSON(res);
  }
  // 递归菜单
  private ArrayList<HashMap<String, Object>> _getMenu(String fid) {
    HashMap<String, Object> tmp;
    ArrayList<HashMap<String, Object>> menu;
    ArrayList<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> M = menus.containsKey(fid)?menus.get(fid):data;
    for( HashMap<String, Object> val : M) {
      String id = val.get("id").toString();
      // 菜单权限
      if(!permAll.containsKey(id)) continue;
      // 动作权限
      int perm = permAll.get(id);
      ArrayList<JSONObject> action = new ArrayList<JSONObject>();
      String actionStr = val.get("action").toString();
      JSONArray actionArr = new JSONArray();
      if(!actionStr.equals("")) actionArr = Util.JsonDecodeArray(actionStr);
      for(int i=0; i<actionArr.size(); i++){
        int permVal = Integer.valueOf(actionArr.getJSONObject(i).get("perm").toString());
        if(actionArr.getJSONObject(i).get("type").toString().equals("1") && (perm&permVal)>0){
          action.add(actionArr.getJSONObject(i));
        }
      }
      // 数据
      HashMap<String, Object> value = new HashMap<String, Object>();
      value.put("url", val.get("url"));
      value.put("controller", val.get("controller"));
      value.put("action", action);
      tmp = new HashMap<String, Object>();
      tmp.put("icon", val.get("ico"));
      tmp.put("label", val.get("title"));
      tmp.put("value", value);
      menu = _getMenu(id);
      if(menu.size()>0) tmp.put("children",menu);
      data.add(tmp);
    }
    return data;
  }
  
}
