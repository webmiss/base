package vip.webmis.java.modules.admin;

import vip.webmis.java.Env;
import vip.webmis.java.common.Base;
import vip.webmis.java.model.SysConfig;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller("AdminIndexController")
@RequestMapping("/admin/index")
public class IndexController extends Base {

  /* 首页 */
  @RequestMapping("")
  String index() {
    // 返回数据
    HashMap<String, Object> data = new HashMap<String, Object>();
    data.put("code", 0);
    data.put("msg", "Admin");
    return getJSON(data);
  }

  /* 系统配置 */
  @RequestMapping("/getConfig")
  String getConfig() throws SQLException {
    // 查询条件
    HashMap<String,Object> params = new HashMap<String,Object>();
    params.put("columns","name,title,val");
    ArrayList<HashMap<String, Object>> config = new SysConfig().find(params);
    // 限制内容
    ArrayList<String> arr = new ArrayList<>();
    arr.add("title");
    arr.add("copy");
    arr.add("logo");
    arr.add("login_bg");
    // 数据
    HashMap<String,Object> list = new HashMap<String,Object>();
    for(int i=0; i<config.size(); i++){
      HashMap<String,Object> val = config.get(i);
      String name = (String)val.get("name");
      if(arr.contains(name)){
        list.put(name, val.get("val"));
        if(name.equals("logo") || name.equals("login_bg")){
          list.put((String)val.get("name"),val.get("val").equals("")==false?Env.base_url+val.get("val"):"");
        }
      }
    }
    // 返回
    HashMap<String,Object> data = new HashMap<String,Object>();
    data.put("code",0);
    data.put("msg","成功");
    data.put("list",list);
    return getJSON(data);
  }

}