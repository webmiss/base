package webmis.modules.home;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.base.Base;
import webmis.model.Demo;

@RestController
@Controller("Index")
@RequestMapping("/")
public class Index extends Base{

  /* 首页 */
  @RequestMapping("")
  String index(){
    // 查询
    Demo demo = new Demo();
    demo.Columns("uid", "title");
    demo.Find();
    // 返回数据
    HashMap<String,Object> data = new HashMap<String,Object>();
    data.put("code",0);
    data.put("msg","Web");
    return getJSON(data);
  }
  
}
