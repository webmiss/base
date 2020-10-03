package vip.webmis.java.modules.admin;

import vip.webmis.java.controller.Base;

import java.util.HashMap;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller("AdminIndexController")
@RequestMapping("/admin/index")
public class IndexController extends Base {

  /* 首页 */
  @RequestMapping("")
  String index(HttpServletResponse response) throws Exception {
    // 返回数据
    HashMap<String,Object> data = new HashMap<String,Object>();
    data.put("code",0);
    data.put("msg","Admin");
    return getJSON(data);
  }

}