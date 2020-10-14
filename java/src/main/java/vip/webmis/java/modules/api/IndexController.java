package vip.webmis.java.modules.api;

import vip.webmis.java.common.Base;
import java.util.HashMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller("ApiIndexController")
@RequestMapping("/api/index")
public class IndexController extends Base{

  /* 首页 */
  @RequestMapping("")
  String index(){
    // 返回数据
    HashMap<String,Object> data = new HashMap<String,Object>();
    data.put("code",0);
    data.put("msg","Api");
    return getJSON(data);
  }

}