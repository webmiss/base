package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.base.Base;
import webmis.config.Env;
import webmis.model.SysConfig;

@RestController
@Controller("AdminIndex")
@RequestMapping("/admin")
public class Index extends Base {

  /* 首页 */
  @RequestMapping("")
  String index(){
    // 返回数据
    HashMap<String,Object> res = new HashMap<String,Object>();
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
    ResultSet rs = config.Query(ps);
    // 数据
    HashMap<String,Object> list = new HashMap<String,Object>();
    String name = "";
    String val = "";
    try {
      while (rs.next()) {
        name = rs.getString(1);
        val = rs.getString(2);
        if(name.equals("logo") || name.equals("login_bg")){
          list.put(name, !val.equals("")?Env.base_url+val:"");
        }else{
          list.put(name, val);
        }
      }
    } catch (SQLException e) { }
    // 返回
    HashMap<String,Object> res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    return GetJSON(res);
  }
}
