package vip.webmis.java.modules.home;

import vip.webmis.java.common.Base;
import java.util.HashMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller("IndexController")
@RequestMapping("/")
public class IndexController extends Base{

  /* 首页 */
  @RequestMapping("")
  String index(){
    // 返回数据
    HashMap<String,Object> data = new HashMap<String,Object>();
    data.put("code",0);
    data.put("msg","Web");
    return getJSON(data);
  }

}