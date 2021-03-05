package webmis.modules.api;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.base.Base;

@RestController
@Controller("ApiIndex")
@RequestMapping("/api")
public class Index extends Base {

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
