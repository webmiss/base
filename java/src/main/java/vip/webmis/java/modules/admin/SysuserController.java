package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.model.User;

@RestController
@Controller("SysUserController")
@RequestMapping("/admin/Sysuser")
public class SysuserController extends Base {

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String data, int page, int limit) throws Exception {
    AdminToken.urlVerify(token,"SysUser");
    // 搜索
    String where = "";
    // 查询
    HashMap<String,Object> params = new HashMap<String,Object>();
    params.put("table","user as a LEFT JOIN user_info as b ON a.id=b.uid");
    params.put("columns",
      "a.id as uid,a.uname as uname,a.email as email,a.tel as tel,a.state as state,"+
      "a.rtime as rtime,a.ltime as ltime,a.utime as utime,"+
      "b.nickname as nickname,b.position as position,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img"
    );
    params.put("order","a.id DESC");
    // 统计
    HashMap<String,Object> cparams = new HashMap<String,Object>(params);
    int total = new User().count(cparams);
    // 分页
    String start = String.valueOf((page-1)*limit);
    params.put("limit",start+","+String.valueOf(limit));
    // 数据
    ArrayList<HashMap<String, Object>> list = new User().find(params);
    // 状态
    for(HashMap<String, Object> val : list){
      val.put("state",val.get("state").equals("1")?true:false);
      val.put("img",val.get("img")!=null&&!val.get("img").equals("")?Env.base_url+String.valueOf(val.get("img")):"");
      val.put("birthday",val.get("birthday")!=null?String.valueOf(val.get("birthday")):"");
      val.put("rtime",val.get("rtime")!=null?Inc.date("yyyy-MM-dd HH:mm:ss",String.valueOf(val.get("rtime"))):"");
      val.put("ltime",val.get("ltime")!=null?Inc.date("yyyy-MM-dd HH:mm:ss",String.valueOf(val.get("ltime"))):"");
      val.put("utime",val.get("utime")!=null?Inc.date("yyyy-MM-dd HH:mm:ss",String.valueOf(val.get("utime"))):"");
    }
    // 返回数据
    HashMap<String, Object> _res = new HashMap<String, Object>();
    _res.put("code", 0);
    _res.put("msg", "成功");
    _res.put("list", list);
    _res.put("total", total);
    return getJSON(_res);
  }

}