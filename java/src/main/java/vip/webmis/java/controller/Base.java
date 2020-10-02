package vip.webmis.java.controller;

import java.util.HashMap;
import javax.servlet.http.HttpServletResponse;
import vip.webmis.java.library.Dynamic;
import com.alibaba.fastjson.JSON;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class Base {

  /* 返回JSON */
  static protected String getJSON(HashMap<String, Object> data) {
    HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    response.addHeader("Access-Control-Allow-Origin", "*");
    response.addHeader("Access-Control-Allow-Methods", "*");
    response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return JSON.toJSONString(data);
  }

  /* 调试信息 */
  static protected void bug(Dynamic<?> data, boolean next){ }
  static protected void bug(Dynamic<?> data) throws Exception {
    boolean next = false;
    getJSON(new HashMap<String, Object>());
    System.out.println(data.getKey());
    if(next==false) error((String)data.getKey());
  }

  /* 异常错误 */
  static protected void error(String msg) throws Exception {
    throw new Exception(msg);
  }

}
