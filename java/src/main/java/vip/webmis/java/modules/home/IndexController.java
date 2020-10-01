package vip.webmis.java.modules.home;

import java.util.HashMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexController {

  @RequestMapping("")
  String index(HashMap<String,Object> map){
    map.put("test","这是一个模板！");
    return "/index";
  }

}
