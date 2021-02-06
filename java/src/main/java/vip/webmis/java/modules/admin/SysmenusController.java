package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.model.SysMenu;

@RestController
@Controller("AdminSysmenusController")
@RequestMapping("/admin/Sysmenus")
public class SysmenusController extends Base {

  private static HashMap<String, Object> menus = null;
  private static HashMap<String, Object> permAll = null;

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String data, int page, int limit) throws Exception {
    // 验证
    AdminToken.urlVerify(token, "SysMenus");
    // 搜索
    JSONObject json = Inc.json_decode(data);
    String fid = json.containsKey("fid")?String.valueOf(json.get("fid")).trim():"";
    String title = json.containsKey("title")?String.valueOf(json.get("title")).trim():"";
    String url = json.containsKey("url")?String.valueOf(json.get("url")).trim():"";
    String where = "fid LIKE \"%:fid:%\" AND title LIKE \"%:title:%\" AND url LIKE \"%:url:%\"";
    JSONObject bind = new JSONObject();
    bind.put("fid",fid);
    bind.put("title",title);
    bind.put("url",url);
    // 查询
    SysMenu model = new SysMenu();
    model.where(where,bind);
    model.order("sort DESC, fid");
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
    AdminToken.urlVerify(token,"SysMenus");
    // 参数
    JSONObject json = Inc.json_decode(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 数据
    SysMenu model = new SysMenu();
    model.fid = json.containsKey("fid")?json.get("fid").toString().trim():"0";
    model.title = json.containsKey("title")?json.get("title").toString().trim():"";
    model.url = json.containsKey("url")?json.get("url").toString().trim():"";
    model.perm = json.containsKey("perm")?json.get("perm").toString().trim():"0";
    model.ico = json.containsKey("ico")?json.get("ico").toString().trim():"";
    model.sort = json.containsKey("sort")?json.get("sort").toString().trim():"0";
    model.remark = json.containsKey("remark")?json.get("remark").toString().trim():"";
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
    AdminToken.urlVerify(token, "SysMenus");
    // 参数
    JSONObject json = Inc.json_decode(data);
    if(json==null || json.isEmpty()){
      _res = new HashMap<String, Object>();
      _res.put("code", 4000);
      _res.put("msg", "参数错误!");
      return getJSON(_res);
    }
    // 数据
    SysMenu model = new SysMenu();
    model.fid = json.containsKey("fid")?json.get("fid").toString().trim():"0";
    model.title = json.containsKey("title")?json.get("title").toString().trim():"";
    model.url = json.containsKey("url")?json.get("url").toString().trim():"";
    model.perm = json.containsKey("perm")?json.get("perm").toString().trim():"0";
    model.ico = json.containsKey("ico")?json.get("ico").toString().trim():"";
    model.sort = json.containsKey("sort")?json.get("sort").toString().trim():"0";
    model.remark = json.containsKey("remark")?json.get("remark").toString().trim():"";
    bind = new JSONObject();
    bind.put("id",id);
    model.where("id=:id:",bind);
    model.uField("fid,title,url,perm,ico,sort,remark");
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
    AdminToken.urlVerify(token, "SysMenus");
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
    SysMenu model = new SysMenu();
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

  /* 获取[菜单] */
  @RequestMapping("/getMenus")
  String getMenus(String token) throws Exception {
    // 验证
    HashMap<String, Object> tokenData = AdminToken.verify(token);
    // 全部菜单
    menus = new HashMap<String, Object>();
    SysMenu model = new SysMenu();
    model.columns("id,fid,title,url,ico");
    model.order("sort DESC,id");
    ArrayList<HashMap<String, Object>> all = model.find();
    for (HashMap<String, Object> val : all) {
      String fid = String.valueOf(val.get("fid"));
      if (menus.containsKey(fid)) {
        String now = JSON.toJSONString(menus.get(fid));
        JSONArray list = JSON.parseArray(now);
        list.add(val);
        menus.put(fid,list);
      }else{
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
        list.add(val);
        menus.put(fid,list);
      }
    }
    // 全部权限
    permAll = AdminToken.perm(tokenData.get("uid").toString());
    // 组合菜单
    HashMap<String, Object> data = new HashMap<String, Object>();
    data.put("code", 0);
    data.put("msg", "成功");
    data.put("menus", _getMenu("0"));
    return getJSON(data);
  }
  /* 递归菜单 */
  private static ArrayList<JSONObject> _getMenu(String fid){
    ArrayList<JSONObject> data = new ArrayList<JSONObject>();
    ArrayList<JSONObject> menu = null;
    JSONObject tmp = null;
    JSONArray M = menus.containsKey(fid)?JSON.parseArray(JSON.toJSONString(menus.get(fid))):JSON.parseArray(JSON.toJSONString(data));
    for( Object val : M) {
      JSONObject now = JSON.parseObject(JSON.toJSONString(val));
      if(permAll.containsKey(String.valueOf(now.get("id")))){
        tmp = new JSONObject();
        tmp.put("icon",now.get("ico"));
        tmp.put("label",now.get("title"));
        tmp.put("value",now.get("url"));
        menu = _getMenu(String.valueOf(now.get("id")));
        if(menu.size()>0) tmp.put("children",menu);
        data.add(tmp);
      }
    }
    return data;
  }

}