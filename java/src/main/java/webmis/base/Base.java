package webmis.base;

import java.util.HashMap;

import com.alibaba.fastjson.JSON;

public class Base {

  /* 返回JSON */
  static protected String getJSON(HashMap<String,Object> data) {
    return JSON.toJSONString(data);
  }
  
}
