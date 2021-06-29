package webmis.config;

import java.util.HashMap;

/* 数据库配置 */
public class Db {

  /* 默认 */
  public static HashMap<String,Object> Default() {
    String host = "127.0.0.1";  //主机
    HashMap<String,Object> cfg = new HashMap<String,Object>();
    cfg.put("jdbc", "mysql://"+host+":3306/data?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai");
    cfg.put("user","webmis");  //用户名
    cfg.put("password","e4b99adec618e653400966be536c45f8");  //密码
    cfg.put("driver","com.mysql.cj.jdbc.Driver");  //驱动
    cfg.put("min",100);  //初始连接数
    cfg.put("max",200);  //最大连接数
    cfg.put("time",30000);  //等待超时(毫秒)
    return cfg;
  }

  /* 其它 */
  public static HashMap<String,Object> Other() {
    String host = "127.0.0.1";  //主机
    HashMap<String,Object> cfg = new HashMap<String,Object>();
    cfg.put("jdbc", "mysql://"+host+":3306/data?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai");
    cfg.put("user","webmis");  //用户名
    cfg.put("password","e4b99adec618e653400966be536c45f8");  //密码
    cfg.put("driver","com.mysql.cj.jdbc.Driver");  //驱动
    cfg.put("min",100);  //初始连接数
    cfg.put("max",200);  //最大连接数
    cfg.put("time",30000);  //等待超时(毫秒)
    return cfg;
  }
  
}
