package webmis.modules.api;

import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.base.Base;
import webmis.service.ApiToken;

@RestController
@Controller("ApiDemo")
@RequestMapping("/api/demo")
public class Demo extends Base {

  /* 验证Token */
  @RequestMapping("token")
  String Token(String token) throws SQLException{
    HashMap<String,Object> res;
    // 验证
    String msg = ApiToken.verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","验证成功");
    return GetJSON(res);
  }

  /* 验证Url */
  @RequestMapping("list")
  String List(HttpServletRequest request, String token) throws SQLException{
    HashMap<String,Object> res;
    // 验证
    String msg = ApiToken.verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","验证成功");
    return GetJSON(res);
  }

  /* 验证Url */
  @RequestMapping("perm")
  String Perm(HttpServletRequest request, String token) throws SQLException{
    HashMap<String,Object> res;
    // 验证
    String msg = ApiToken.verify(token, request.getRequestURI());
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","验证成功");
    return GetJSON(res);
  }
  
}
