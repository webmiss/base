package webmis.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

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

  private static HashMap<String, ArrayList<HashMap<String, Object>>> menus = null;
  private static HashMap<String, Integer> permAll = null;

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
