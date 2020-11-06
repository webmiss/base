package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.model.SysMenu;
import vip.webmis.java.model.SysMenuAction;

@RestController
@Controller("AdminSysMenusActionController")
@RequestMapping("/admin/Sysmenusaction")
public class SysmenusactionController extends Base {

  /* 获取[动作菜单] */
  @RequestMapping("/getAction")
  String getMenus(String token,String url) throws Exception {
    HashMap<String, Object> params;
    HashMap<String, Object> data;
    // 验证
    HashMap<String, Object> tokenData = AdminToken.verify(token);
    // 是否为空
    if(url.equals("")){
      data = new HashMap<String, Object>();
      data.put("code", 4000);
      data.put("msg", "获取动作不能为空!");
      return getJSON(data);
    }
    // 菜单ID
    params = new HashMap<String, Object>();
    params.put("where","url=\""+url+"\"");
    params.put("columns","id");
    HashMap<String, Object> mid = new SysMenu().findFirst(params);
    if(mid.isEmpty()){
      data = new HashMap<String, Object>();
      data.put("code", 4000);
      data.put("msg", "获取动作不存在!");
      return getJSON(data);
    }
    // 全部动作
    ArrayList<HashMap<String, Object>> action = new ArrayList<HashMap<String, Object>>();
    HashMap<String, Object> permAll = AdminToken.perm(tokenData.get("uid").toString());
    Integer perm = Integer.valueOf((String)permAll.get(String.valueOf(mid.get("id"))));
    params = new HashMap<String, Object>();
    params.put("columns","name,action,ico,perm");
    ArrayList<HashMap<String, Object>> aMenus = new SysMenuAction().find(params);
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