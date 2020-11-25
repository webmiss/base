package vip.webmis.java.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Inc;
import vip.webmis.java.model.UserRole;

/* 用户角色 */
@RestController
@Controller("SysRoleController")
@RequestMapping("/admin/Sysrole")
public class SysroleController extends Base {

  /* 列表 */
  @RequestMapping("/list")
  String list(String token, String data, int page, int limit) throws Exception {
    // 验证
    AdminToken.urlVerify(token, "SysRole");
    // 搜索
    JSONObject req = Inc.json_decode(data);
    String role = String.valueOf(req.get("role")).trim();
    String where = "role LIKE '%:role:%'";
    JSONObject bind = new JSONObject();
    bind.put("role",role);
    // 查询
    UserRole model = new UserRole();
    model.where(where,bind);
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
      tmp = String.valueOf(val.get("ctime"));
      time = !tmp.equals("null")?Inc.date("yyyy-MM-dd HH:mm:ss",Long.valueOf(tmp)):"";
      val.put("ctime", time);
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