package vip.webmis.java.modules.admin;

import vip.webmis.java.Env;
import vip.webmis.java.common.Base;
import vip.webmis.java.model.SysConfig;
import vip.webmis.java.library.Socket;

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
    HashMap<String,Object> _res = new HashMap<String,Object>();
    _res.put("code", 0);
    _res.put("msg", "Admin");
    return getJSON(_res);
  }

  /* 系统配置 */
  @RequestMapping("/getConfig")
  String getConfig() throws Exception {
    HashMap<String,Object> _res;
    // 查询
    SysConfig model = new SysConfig();
    model.where("name in ('title','copy','logo','login_bg')");
    model.columns("name,val");
    ArrayList<HashMap<String, Object>> config = model.find();
    // 数据
    HashMap<String,Object> list = new HashMap<String,Object>();
    for(HashMap<String, Object> val : config){
      if(val.get("name").equals("logo") || val.get("name").equals("login_bg")){
        list.put(val.get("name").toString(),!val.get("val").equals("")?Env.base_url+val.get("val"):"");
      }else{
        list.put(val.get("name").toString(),val.get("val"));
      }
    }
    // 返回
    _res = new HashMap<String,Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    _res.put("list",list);
    return getJSON(_res);
  }

  /* WebSocket */
  @RequestMapping("/socket")
  String socket() {
    HashMap<String,Object> msg = new HashMap<String,Object>();
    msg.put("type","msg");
    msg.put("uid","1");
    msg.put("msg","Web方式");
    Socket.send("admin",msg);
    return "";
  }

}