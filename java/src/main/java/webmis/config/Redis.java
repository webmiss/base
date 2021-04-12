package webmis.config;

import java.util.HashMap;

/* Redis配置 */
public class Redis {

  public static final String host = "127.0.0.1";    //主机
  public static final int port = 6379;              //端口
  public static final String password = "";         //密码
  public static final int db = 0;                   //硬盘

  /* 默认 */
  public static HashMap<String, Object> Default() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("host", "127.0.0.1");   //主机
    cfg.put("port", 6379);          //端口
    cfg.put("password", "");        //密码
    cfg.put("db", 0);               //硬盘
    cfg.put("min", 100);            //空闲数
    cfg.put("max", 200);            //最大数
    return cfg;
  }

  /* 其它 */
  public static HashMap<String, Object> Other() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("host", "127.0.0.1");   //主机
    cfg.put("port", 6379);          //端口
    cfg.put("password", "");        //密码
    cfg.put("db", 0);               //硬盘
    cfg.put("min", 100);            //空闲数
    cfg.put("max", 200);            //最大数
    return cfg;
  }
  
}
