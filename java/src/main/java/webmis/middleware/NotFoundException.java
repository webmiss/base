package webmis.middleware;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotFoundException implements ErrorController {

  // @Override
  // public String getErrorPath() {
  //   return "/error";
  // }

  @RequestMapping("/error")
  public Object error(HttpServletRequest request, HttpServletResponse response){
    response.setStatus(200);
    HashMap<String, Object> map = new HashMap<>();
    map.put("code", 404);
    map.put("msg", "Not Found");
    return map;
  }
  
}
