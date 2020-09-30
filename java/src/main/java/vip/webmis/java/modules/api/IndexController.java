package vip.webmis.java.modules.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller("ApiIndexController")
public class IndexController{

  @RequestMapping("/api/index")
  String index(){
    return "Api";
  }

  @RequestMapping("/api/test")
  String home(){
    return "Test";
  }
}