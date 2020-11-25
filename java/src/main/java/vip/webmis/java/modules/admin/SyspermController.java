package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.model.UserPerm;

/* 用户权限 */
@RestController
@Controller("SysPermController")
@RequestMapping("/admin/Sysperm")
public class SyspermController extends Base {

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String data, int page, int limit) throws Exception {
    // 验证
    AdminToken.urlVerify(token, "SysPerm");
    // 搜索
    JSONObject req = Inc.json_decode(data);
    String uname = String.valueOf(req.get("uname")).trim();
    String where = "b.uname LIKE \"%:uname:%\" OR b.tel LIKE \"%:uname:%\" OR b.email LIKE \"%:uname:%\"";
    JSONObject bind = new JSONObject();
    bind.put("uname",uname);
    // 查询
    UserPerm model = new UserPerm();
    model.table("user_perm AS a LEFT JOIN user AS b ON a.uid=b.id LEFT JOIN user_info AS c ON a.uid=c.uid");
    model.columns(
      "a.uid, a.perm, a.role, a.state_admin, a.state_app,"+
      "b.uname, b.email, b.tel, b.state, b.rtime, b.ltime, b.utime,"+
      "c.nickname, c.position, c.name, c.gender, c.birthday, c.img"
    );
    model.where(where,bind);
    model.order("a.uid DESC");
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
      val.put("state", val.get("state").equals("1")?true:false);
      val.put("state_admin", val.get("state_admin").equals("1")?true:false);
      val.put("state_app", val.get("state_app").equals("1")?true:false);
      val.put("uid", val.get("uid").toString());
      val.put("img", val.get("img")!=null&&!val.get("img").equals("")?Env.base_url + String.valueOf(val.get("img")):"");
      val.put("birthday", val.get("birthday")!=null?String.valueOf(val.get("birthday")):"");
      tmp = String.valueOf(val.get("rtime"));
      time = !tmp.equals("null")?Inc.date("yyyy-MM-dd HH:mm:ss",Long.valueOf(tmp)):"";
      val.put("rtime", time);
      tmp = String.valueOf(val.get("ltime"));
      time = !tmp.equals("null")?Inc.date("yyyy-MM-dd HH:mm:ss",Long.valueOf(tmp)):"";
      val.put("ltime", time);
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

}