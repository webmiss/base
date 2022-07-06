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

import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.util.Type;
import webmis.util.Util;

@RestController
@Controller("AdminWebNewsClass")
@RequestMapping("/admin/news_class")
public class WebNewsClass extends Base {

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
    webmis.model.WebNewsClass m = new webmis.model.WebNewsClass();
    m.Columns("count(*) AS num");
    m.Where(where, whereData);
    HashMap<String, Object> total = m.FindFirst();
    // 查询
    m.Columns("id", "name", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "state", "sort");
    m.Where(where, whereData);
    m.Order(!order.equals("")?order:"sort DESC");
    m.Page(page, limit);
    ArrayList<HashMap<String,Object>> list = m.Find();
    // 数据
    for (HashMap<String, Object> val : list) {
      val.put("state", val.get("state").equals("1")?true:false);
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
    String state = (boolean) param.get("state")?"1":"0";
    Integer sort = param.containsKey("sort")?Integer.valueOf((String)param.get("sort")):0;
    if(name.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.WebNewsClass m = new webmis.model.WebNewsClass();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("name", name);
    uData.put("ctime", Util.Time());
    uData.put("utime", Util.Time());
    uData.put("state", state);
    uData.put("sort", sort);
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
    String state = (boolean) param.get("state")?"1":"0";
    Integer sort = param.containsKey("sort")?Integer.valueOf((String)param.get("sort")):0;
    if(name.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4000);
      res.put("msg", "名称不能为空!");
      return GetJSON(res);
    }
    // 模型
    webmis.model.WebNewsClass m = new webmis.model.WebNewsClass();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("name", name);
    uData.put("utime", Util.Time());
    uData.put("state", state);
    uData.put("sort", sort);
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
    webmis.model.WebNewsClass m = new webmis.model.WebNewsClass();
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

  /* 状态 */
  @RequestMapping("state")
  String State(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    String id = JsonName(json, "id");
    String state = JsonName(json, "state");
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
    webmis.model.WebNewsClass m = new webmis.model.WebNewsClass();
    HashMap<String,Object> uData = new HashMap<String,Object>();
    uData.put("state", Boolean.valueOf(state)?"1":"0");
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
  
}
