package webmis.config;

/* 数据库配置 */
public class Db {

  public static String Driver = "com.mysql.cj.jdbc.Driver";             //驱动
  public static String Host = "127.0.0.1";                              //主机
  public static String Port = "3306";                                   //端口
  public static String User = "webmis";                                 //账号
  public static String Password = "e4b99adec618e653400966be536c45f8";   //密码
  public static String Database = "data";                               //数据库名
  public static String Charset = "utf8";                                //编码
  public static int Min = 20;                                           //空闲连接数
  public static int Max = 30;                                           //最大连接数
  
}
