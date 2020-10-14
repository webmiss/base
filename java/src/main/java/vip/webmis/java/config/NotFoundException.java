package vip.webmis.java.config;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NotFoundException implements ErrorController {

  @Override
  public String getErrorPath() {
    return "/error";
  }

  @RequestMapping("/error")
  public String error(ModelMap map){
    map.put("msg", "404 not found link！");
    return "404";
  }
  
}
