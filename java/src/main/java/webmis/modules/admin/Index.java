package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.service.Data;
import webmis.model.SysConfig;

@RestController
@Controller("AdminIndex")
@RequestMapping("/admin")
public class Index extends Base {

  /* 首页 */
  @RequestMapping("")
  String index(){
    HashMap<String,Object> res;
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Admin");
    return GetJSON(res);
  }

  /* 系统配置 */
  @RequestMapping("index/getConfig")
  String GetConfig(){
    // 查询
    SysConfig config = new SysConfig();
    config.Columns("name","val");
    config.Where("name in (\"title\",\"copy\",\"logo\",\"login_bg\")");
    String sql = config.SelectSql();
    PreparedStatement ps = config.Bind(sql);
    ArrayList<HashMap<String, Object>> data = config.Find(ps);
    // 数据
    HashMap<String,Object> list = new HashMap<String,Object>();
    for(HashMap<String, Object> val : data){
      if(val.get("name").equals("logo") || val.get("name").equals("login_bg")){
        list.put(val.get("name").toString(), Data.Img(val.get("val")));
      } else {
        list.put(val.get("name").toString(), val.get("val"));
      }
    }
    // 返回
    HashMap<String,Object> res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    return GetJSON(res);
  }
}
