package webmis.modules.api;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;

@RestController
@Controller("ApiIndex")
@RequestMapping("/api")
public class Index extends Base {

  /* 首页 */
  @RequestMapping("")
  String index(){
    HashMap<String,Object> res;
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Java Api");
    return GetJSON(res);
  }
  
}
