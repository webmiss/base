package vip.webmis.java.common;

import java.util.HashMap;
import com.alibaba.fastjson.JSON;

public class Base {

  /* 返回JSON */
  static protected String getJSON(HashMap<String, Object> data) {
    return JSON.toJSONString(data);
  }

  /* 调试信息 */
  static protected void bug(Dynamic<?> data) {
    bug(data,false);
  }
  static protected void bug(Dynamic<?> data, boolean next) {
    getJSON(new HashMap<String, Object>());
    System.out.println(data.getKey());
    if (next == false)
      error((String) data.getKey());
  }

  /* 异常错误 */
  static protected void error(String msg) {
    try { throw new Exception(msg); }catch(Exception e){}
  }

}
