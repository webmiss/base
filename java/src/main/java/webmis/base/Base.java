package webmis.base;

import java.util.HashMap;

import com.alibaba.fastjson.JSON;

public class Base {

  /* 输出到控制台 */
  static protected void Print(Object... content) {
    System.out.println(content);
  }

  /* 返回JSON */
  static protected String getJSON(HashMap<String,Object> data) {
    return JSON.toJSONString(data);
  }
  
}
