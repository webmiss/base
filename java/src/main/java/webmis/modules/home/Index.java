package webmis.modules.home;

import java.sql.PreparedStatement;
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
    ArrayList<HashMap<String,Object>> data = null;
    int id = 0;
    // 查询
    Demo demo = new Demo();
    demo.Columns("uid", "title");
    demo.Where("title LIKE ?");
    demo.Limit(0, 1);
    String sql1 = demo.SelectSql();
    // 参数
    PreparedStatement pst1 = !sql1.equals("")?demo.Bind("select", sql1):null;
    if(pst1 != null){
      pst1.setString(1, "%事务%");
      data = demo.Find(pst1);
    }
    // 添加
    demo.Values("uid","title");
    String sql = demo.InsertSql();
    // 参数
    PreparedStatement pst = !sql.equals("")?demo.Bind("insert", sql):null;
    if(pst != null){
      pst.setNull(1, 0);
      pst.setString(2, "Java-添加");
      // 执行
      id = demo.Insert(pst);
      Print(id);
    }
    // 关闭
    demo.Close();
    // 返回数据
    HashMap<String,Object> res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Web");
    res.put("data",data);
    return GetJSON(res);
  }
  
}
