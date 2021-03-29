package webmis.modules.admin;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.service.AdminToken;
import webmis.config.Env;
import webmis.library.FileEo;
import webmis.library.Safety;
import webmis.model.User;
import webmis.util.Util;

@RestController
@Controller("AdminSysFile")
@RequestMapping("/admin/sysfile")
public class SysFile extends Base {

  private static final String dirRoot="upload/";

  /* 列表 */
  @RequestMapping("list")
  String List(HttpServletRequest request, String token, String path) throws SQLException {
    HashMap<String,Object> res;
    // 验证
    String msg = AdminToken.verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 参数
    FileEo.Root = Env.root_dir+dirRoot;
    HashMap<String, Object> list = FileEo.List(path);
    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("url", Env.base_url+dirRoot);
    res.put("data", list);
    return GetJSON(res);
  }

}
