package webmis.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.model.SysMenu;
import webmis.service.AdminToken;
import webmis.util.Type;
import webmis.util.Util;

/* 系统菜单 */
@RestController
@Controller("AdminSysMenus")
@RequestMapping("/admin/sys_menus")
public class SysMenus extends Base {

  private static String where;
  private static Object[] whereData;
  private static HashMap<String, ArrayList<HashMap<String, Object>>> menus = null;  //全部菜单
  private static HashMap<String, Long> permAll = null;                           //用户权限

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
    if(data=="" || page==0 || limit==0){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 条件
    JSONObject param = Util.JsonDecode(data);
    whereData = getWhere(param);
    // 统计
    SysMenu m = new SysMenu();
    m.Columns("count(*) AS num");
    m.Where(where, whereData);
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Columns("id", "fid", "title", "en", "ico", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "sort", "url", "controller", "action");
    m.Where(where, whereData);
    m.Order(!order.equals("")?order:"fid DESC, sort, id DESC");
    m.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = m.Find();
    // 数据
    for (HashMap<String, Object> val : list) {
      val.put("action", !val.get("action").equals("")?Util.JsonDecodeArray(val.get("action").toString()):"");
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
    String fid = param.containsKey("fid")?String.valueOf(param.get("fid")).trim():"";
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    String en = param.containsKey("en")?String.valueOf(param.get("en")).trim():"";
    String url = param.containsKey("url")?String.valueOf(param.get("url")).trim():"";
    // 条件
    where = "fid like ? AND title like ? AND en like ? AND url like ?";
    Object[] whereData = {"%"+fid+"%", "%"+title+"%", "%"+en+"%", "%"+url+"%"};
    return whereData;
  }

  /* 添加 */
  @RequestMapping("add")
  String Add(@RequestBody JSONObject json, HttpServletRequest request) {
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
    if(data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    JSONObject param = Util.JsonDecode(data);
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    if(title.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 模型
    SysMenu m = new SysMenu();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("fid", param.containsKey("fid")?String.valueOf(param.get("fid")).trim():0);
    uData.put("title", title);
    uData.put("en", param.containsKey("en")?String.valueOf(param.get("en")).trim():"");
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
  String Edit(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String id = JsonName(json, "id");
    String data = JsonName(json, "data");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(id=="" || data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    JSONObject param = Util.JsonDecode(data);
    String title = param.containsKey("title")?String.valueOf(param.get("title")).trim():"";
    if(title.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 模型
    SysMenu m = new SysMenu();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("fid", param.containsKey("fid")?String.valueOf(param.get("fid")).trim():0);
    uData.put("title", title);
    uData.put("en", param.containsKey("en")?String.valueOf(param.get("en")).trim():"");
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
    if(data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 数据
    JSONArray param = Util.JsonDecodeArray(data);
    String ids = Util.Implode(",", JSONArray.parseArray(param.toJSONString()));
    // 模型
    SysMenu m = new SysMenu();
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

  /* 动作权限 */
  @RequestMapping("perm")
  String Perm(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String id = JsonName(json, "id");
    String data = JsonName(json, "data");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(id=="" || data==""){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 模型
    SysMenu m = new SysMenu();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("action", data);
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

  /* 获取菜单-全部 */
  @RequestMapping("getMenusAll")
  String GetMenusAll(@RequestBody JSONObject json) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 全部菜单
    _getMenus();
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("menus", _getMenusAll("0"));
    return GetJSON(res);
  }
  // 递归菜单
  private ArrayList<HashMap<String, Object>> _getMenusAll(String fid) {
    HashMap<String, Object> tmp;
    ArrayList<HashMap<String, Object>> menu;
    ArrayList<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> M = menus.containsKey(fid)?menus.get(fid):data;
    for( HashMap<String, Object> val : M) {
      String id = val.get("id").toString();
      tmp = new HashMap<String, Object>();
      tmp.put("label", val.get("title"));
      tmp.put("value", id);
      menu = _getMenusAll(id);
      if(menu.size()>0) tmp.put("children",menu);
      data.add(tmp);
    }
    return data;
  }

  /* 获取菜单-权限 */
  @RequestMapping("getMenusPerm")
  String GetMenusPerm(@RequestBody JSONObject json) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 全部菜单
    _getMenus();
    // 用户权限
    permAll = AdminToken.Perm(token);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("menus", _getMenusPerm("0"));
    return GetJSON(res);
  }
  // 递归菜单
  private ArrayList<HashMap<String, Object>> _getMenusPerm(String fid) {
    HashMap<String, Object> tmp;
    ArrayList<HashMap<String, Object>> menu;
    ArrayList<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> M = menus.containsKey(fid)?menus.get(fid):data;
    for( HashMap<String, Object> val : M) {
      // 菜单权限
      String id = val.get("id").toString();
      if(!permAll.containsKey(id)) continue;
      // 动作权限
      Long perm = permAll.get(id);
      ArrayList<JSONObject> action = new ArrayList<JSONObject>();
      String actionStr = val.get("action").toString();
      JSONArray actionArr = new JSONArray();
      if(!actionStr.equals("")) actionArr = Util.JsonDecodeArray(actionStr);
      for(int i=0; i<actionArr.size(); i++){
        long permVal = Long.valueOf(actionArr.getJSONObject(i).get("perm").toString());
        if((perm&permVal)>0){
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
      tmp.put("en", val.get("en"));
      tmp.put("value", value);
      menu = _getMenusPerm(id);
      if(menu.size()>0) tmp.put("children",menu);
      data.add(tmp);
    }
    return data;
  }

  /* 全部菜单 */
  private void _getMenus(){
    ArrayList<HashMap<String, Object>> tmp;
    menus = new HashMap<String, ArrayList<HashMap<String, Object>>>();
    SysMenu model = new SysMenu();
    model.Columns("id", "fid", "title", "en", "url", "ico", "controller", "action");
    model.Order("sort, id");
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
  }
  
}
