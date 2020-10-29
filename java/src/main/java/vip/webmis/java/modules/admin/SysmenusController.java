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
import vip.webmis.java.model.SysMenu;

@RestController
@Controller("AdminSysmenusController")
@RequestMapping("/admin/Sysmenus")
public class SysmenusController extends Base {

  private static HashMap<String, Object> menus = null;
  private static HashMap<String, Object> permAll = null;

  /* 获取[菜单] */
  @RequestMapping("/getMenus")
  String getMenus(String token) throws Exception {
    // 验证
    HashMap<String, Object> tokenData = AdminToken.verify(token);
    // 全部菜单
    menus = new HashMap<String, Object>();
    HashMap<String, Object> params = new HashMap<String, Object>();
    params.put("columns", "id,fid,title,url,ico");
    params.put("order", "sort DESC,id");
    ArrayList<HashMap<String, Object>> all = new SysMenu().find(params);
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
    permAll = AdminToken.perm(String.valueOf(tokenData.get("uid")));
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
    JSONArray M = menus.containsKey(fid)?JSON.parseArray(JSON.toJSONString(menus.get(fid))):JSON.parseArray(JSON.toJSONString(data));
    for( Object val : M) {
      JSONObject now = JSON.parseObject(JSON.toJSONString(val));
      if(permAll.containsKey(String.valueOf(now.get("id")))){
        now.put("children", _getMenu(String.valueOf(now.get("id"))));
        data.add(now);
      }
    }
    return data;
  }

}