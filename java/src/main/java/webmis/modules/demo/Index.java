package webmis.modules.demo;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;

@RestController
@Controller("DemoIndex")
@RequestMapping("/demo")
public class Index extends Base {

  /* 首页 */
  @RequestMapping("")
  String index(){
    HashMap<String,Object> res;
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Demo");
    return GetJSON(res);
  }
  
}
