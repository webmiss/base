package webmis.config;

import java.util.HashMap;

/* 百度 */
public class Baidu {

  /* 统计-商业账号 */
  public static HashMap<String, Object> TongJi() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("UserName", "kingsoul");
    cfg.put("PassWord", "eckingsoul");
    cfg.put("Token", "c67cde72015a76798c707b170fc6987e");
    cfg.put("AccountType", 1);
    return cfg;
  }
  
}
