package vip.webmis.java.modules.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller("AdminIndexController")
public class IndexController{

  @RequestMapping("/admin/index")
  String index(){
    return "Admin";
  }

}