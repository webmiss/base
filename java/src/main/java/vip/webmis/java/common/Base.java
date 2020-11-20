package vip.webmis.java.common;

import java.util.HashMap;

import com.alibaba.fastjson.JSON;

public class Base {

  /* 返回JSON */
  static protected String getJSON(HashMap<String,Object> data) {
    return JSON.toJSONString(data);
  }

  /* 调试信息 */
  static protected void bug(Dynamic<?> data) {
    bug(data,false);
  }
  static protected void bug(Dynamic<?> data, boolean next) {
    getJSON(new HashMap<String,Object>());
    System.out.println(data.getKey());
    if (next == false){
      try { error((String) data.getKey()); }catch(Exception e){}
    }
  }

  /* 异常错误 */
  static protected void error(String msg) throws Exception {
    System.out.println(msg);
    throw new Exception(msg);
  }

}
