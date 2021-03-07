package webmis.modules.home;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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
  String index() throws SQLException{
    // 查询
    Demo demo = new Demo();
    demo.Columns("uid", "title");
    demo.Where("title LIKE ?");
    demo.Limit(0, 1);
    String sql = demo.SelectSql();
    // 参数
    PreparedStatement pst = demo.Bind(sql);
    pst.setString(1, "%事务%");
    // 数据
    // ArrayList<HashMap<String,Object>> data = demo.Find(pst);
    HashMap<String,Object> data = demo.FindFirst(pst);
    // 关闭
    demo.Close();
    // 返回数据
    HashMap<String,Object> res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Web");
    res.put("data",data);
    return getJSON(res);
  }
  
}
