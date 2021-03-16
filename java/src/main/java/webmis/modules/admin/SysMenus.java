package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.base.Base;
import webmis.model.SysMenu;

/* 系统菜单 */
@RestController
@Controller("AdminSysMenus")
@RequestMapping("/admin/Sysmenus")
public class SysMenus extends Base {

  private static HashMap<String, ArrayList<HashMap<String, Object>>> menus = null;
  private static HashMap<String, Object> permAll = null;

  /* 获取菜单 */
  @RequestMapping("getMenus")
  String getMenus() {
    HashMap<String,Object> res;
    ArrayList<HashMap<String, Object>> tmp;
    // 全部菜单
    menus = new HashMap<String, ArrayList<HashMap<String, Object>>>();
    SysMenu model = new SysMenu();
    model.Columns("id", "fid", "title", "url", "ico");
    model.Order("sort DESC, id");
    String sql = model.SelectSql();
    PreparedStatement ps = model.Bind(sql);
    ArrayList<HashMap<String, Object>> all = model.Find(ps);
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
      String id = String.valueOf(val.get("id"));
      tmp = new HashMap<String, Object>();
      tmp.put("icon", val.get("ico"));
      tmp.put("label", val.get("title"));
      tmp.put("value", val.get("url"));
      menu = _getMenu(id);
      if(menu.size()>0) tmp.put("children",menu);
      data.add(tmp);
    }
    return data;
  }
  
}
