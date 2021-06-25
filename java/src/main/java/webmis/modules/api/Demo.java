package webmis.modules.api;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.Base;
import webmis.service.ApiToken;

@RestController
@Controller("ApiDemo")
@RequestMapping("/api/demo")
public class Demo extends Base {

  /* 验证Token */
  @RequestMapping("token")
  String Token(@RequestBody JSONObject json) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = ApiToken.Verify(token, "");
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
  String List(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = ApiToken.Verify(token, request.getRequestURI());
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
  String Perm(@RequestBody JSONObject json, HttpServletRequest request) {
    HashMap<String,Object> res;
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = ApiToken.Verify(token, request.getRequestURI());
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
