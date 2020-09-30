package vip.webmis.java.modules.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller("AdminIndexController")
@RequestMapping("/admin")
public class IndexController{

  /* 首页 */
  @RequestMapping("")
  String get(){
    return this.index();
  }
  @RequestMapping("/index")
  String index(){
    return "Admin";
  }

}