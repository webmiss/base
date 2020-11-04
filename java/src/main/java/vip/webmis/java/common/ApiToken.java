package vip.webmis.java.common;

import java.util.HashMap;

import vip.webmis.java.library.Safety;

public class ApiToken extends Base {

  /* 验证&数据 */
  public static HashMap<String, Object> verify(String token) {
    // 验证Token
    HashMap<String, Object> res = Safety.decode(token);
    if(res==null) error("Token验证失败!");
    return res;
  }

}
