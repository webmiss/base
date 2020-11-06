package vip.webmis.java;

import java.util.HashMap;

/* 配置 */
public class Env {

  /* 资源 */
  public static final String base_url = "https://demo-java.webmis.vip/"; //根目录
  /* 加密 */
  public static final String key = "e4b99adec618e653400966be536c45f8";  //KEY
  /* Token */
  public static final String admin_token_prefix = "AdminToken_";  //前缀
  public static final int admin_token_time = 1*3600;  //有效时长
  public static final boolean admin_token_auto = true;  //自动续期
  public static final String api_token_prefix = "ApiToken_";  //前缀
  public static final int api_token_time = 7*24*3600;  //有效时长
  public static final boolean api_token_auto = true;  //自动续期

  /* 数据库 */
  public static HashMap<String,Object> db() {
    HashMap<String,Object> conf = new HashMap<String,Object>();
    conf.put("jdbc","mysql://121.37.10.103:3306/data?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai"); //类型
    conf.put("user","webmis");  //用户名
    conf.put("password","e4b99adec618e653400966be536c45f8");  //密码
    conf.put("driver","com.mysql.cj.jdbc.Driver");  //驱动
    conf.put("initialSize",1);  //初始连接数
    conf.put("maxActive",10);  //最大连接数
    return conf;
  }
  
  /* 缓存数据库 */
  public static HashMap<String,Object> redis() {
    HashMap<String,Object> conf = new HashMap<String,Object>();
    conf.put("host","127.0.0.1"); //主机
    conf.put("port",6379);  //端口
    conf.put("password","");  //密码
    conf.put("db",0); //硬盘
    return conf;
  }

}
