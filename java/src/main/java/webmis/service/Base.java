package webmis.service;

import java.util.HashMap;

import com.alibaba.fastjson.JSON;

public class Base {

  /* 返回JSON */
  static protected String GetJSON(HashMap<String,Object> data) {
    return JSON.toJSONString(data);
  }

  /* 输出到控制台 */
  static protected void Print(Object... content) {
    for(int i=0; i<content.length; i++){
      System.out.print(content[i]);
      System.out.print(" ");
    }
    System.out.print("\n");
  }
  
}
