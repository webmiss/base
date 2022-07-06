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

import webmis.model.ApiMenu;
import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.util.Type;
import webmis.util.Util;

@RestController
@Controller("AdminApiRole")
@RequestMapping("/admin/api_role")
public class ApiRole extends Base {

  private static String where;
  private static Object[] whereData;
  private static HashMap<String, ArrayList<HashMap<String, Object>>> menus = null;  //全部菜单
  private static HashMap<String, Long> permAll = null;                              //用户权限

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
    webmis.model.ApiRole m = new webmis.model.ApiRole();
    m.Columns("count(*) AS num");
    m.Where(where, whereData);
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Columns("id", "name", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "perm");
    m.Where(where, whereData);
    m.Order(!order.equals("")?order:"id DESC");
    m.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = m.Find();
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
    String name = param.containsKey("name")?String.valueOf(param.get("name")).trim():"";
    // 条件
    where = "name LIKE ?";
    Object[] whereData = {"%"+name+"%"};
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
    String name = param.containsKey("name")?String.valueOf(param.get("name")).trim():"";
    if(name.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.ApiRole m = new webmis.model.ApiRole();
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
    String name = param.containsKey("name")?String.valueOf(param.get("name")).trim():"";
    if(name.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.ApiRole m = new webmis.model.ApiRole();
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
    webmis.model.ApiRole m = new webmis.model.ApiRole();
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
  String Perm(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String id = JsonName(json, "id");
    String perm = JsonName(json, "perm");
    // 验证
    String msg = AdminToken.Verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    if(id==null){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "参数错误!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.ApiRole m = new webmis.model.ApiRole();
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

  /* 角色-列表 */
  @RequestMapping("roleList")
  String RoleList(@RequestBody JSONObject json, HttpServletRequest request) {
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
    // 查询
    webmis.model.ApiRole m = new webmis.model.ApiRole();
    m.Columns("id", "name");
    HashMap<String, Object> tmp = new HashMap<String, Object>();
    ArrayList<HashMap<String, Object>> data = m.Find();
    ArrayList<HashMap<String, Object>> lists = new ArrayList<HashMap<String, Object>>();
    tmp.put("label", "无");
    tmp.put("value", 0);
    lists.add(tmp);
    for (HashMap<String, Object> val : data) {
      tmp = new HashMap<String, Object>();
      tmp.put("label", val.get("name"));
      tmp.put("value", val.get("id"));
      lists.add(tmp);
    }
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", lists);
    return GetJSON(res);
  }

  /* 权限-列表 */
  @RequestMapping("permList")
  String PermList(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String perm = JsonName(json, "perm");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 全部菜单
    ArrayList<HashMap<String, Object>> tmp;
    menus = new HashMap<String, ArrayList<HashMap<String, Object>>>();
    ApiMenu model = new ApiMenu();
    model.Columns("id", "fid", "title", "url", "ico", "controller", "action");
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
    // 用户权限
    permAll = permArr(perm);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", _getMenu("0"));
    return GetJSON(res);
  }
  // 权限-拆分
  private HashMap<String, Long> permArr(String perm) {
    HashMap<String, Long> permAll = new HashMap<String, Long>();
    ArrayList<String> arr = !perm.isEmpty()?Util.Explode(" ", perm):new ArrayList<String>();
    ArrayList<String> s;
    for(String val : arr){
      s = Util.Explode(":", val);
      permAll.put(s.get(0), Long.valueOf(s.get(1)));
    }
    return permAll;
  }
  // 递归菜单
  private ArrayList<HashMap<String, Object>> _getMenu(String fid) {
    HashMap<String, Object> tmp;
    ArrayList<HashMap<String, Object>> menu;
    ArrayList<HashMap<String, Object>> data = new ArrayList<HashMap<String, Object>>();
    ArrayList<HashMap<String, Object>> M = menus.containsKey(fid)?menus.get(fid):data;
    for( HashMap<String, Object> val : M) {
      // 菜单权限
      String id = val.get("id").toString();
      Long perm = permAll.containsKey(id)?permAll.get(id):0;
      // 动作权限
      HashMap<String, Object> actionTmp;
      ArrayList<HashMap<String, Object>> action = new ArrayList<HashMap<String, Object>>();
      String actionStr = val.get("action").toString();
      JSONArray actionArr = new JSONArray();
      if(!actionStr.equals("")) actionArr = Util.JsonDecodeArray(actionStr);
      for(int i=0; i<actionArr.size(); i++){
        Long permVal = Long.valueOf(actionArr.getJSONObject(i).get("perm").toString());
        boolean checked = (perm&permVal)>0?true:false;
        actionTmp = new HashMap<String, Object>();
        actionTmp.put("id", String.valueOf(val.get("id").toString())+"_"+String.valueOf(actionArr.getJSONObject(i).get("perm").toString()));
        actionTmp.put("label", actionArr.getJSONObject(i).get("name"));
        actionTmp.put("checked", checked);
        actionTmp.put("perm", actionArr.getJSONObject(i).get("perm"));
        action.add(actionTmp);
      }
      // 数据
      boolean checked = permAll.containsKey(id)?true:false;
      tmp = new HashMap<String, Object>();
      tmp.put("id", val.get("id"));
      tmp.put("label", val.get("title"));
      tmp.put("checked", checked);
      if(val.get("fid").equals(0)) tmp.put("show", true);
      // children
      menu = _getMenu(id);
      if(menu.size()>0) tmp.put("children", menu);
      else if(action.size()>0) {
        tmp.put("action", true);
        tmp.put("children", action);
      }
      data.add(tmp);
    }
    return data;
  }
  
}
