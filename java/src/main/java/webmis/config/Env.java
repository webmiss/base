package webmis.config;

/* 公共配置 */
public class Env {

  public static final String base_url = "https://demo-java.webmis.vip/";   //资源
  // public static final String base_url = "http://localhost/java/public/";      //资源
  public static final String root_dir = "public/";                            //根目录
  public static final String key = "e4b99adec618e653400966be536c45f8";        //KEY
  /* Token */
  public static final String admin_token_prefix = "AdminToken_";              //前缀
  public static final int admin_token_time = 2*3600;                          //有效时长(2小时)
  public static final boolean admin_token_auto = true;                        //自动续期
  public static final String api_token_prefix = "ApiToken_";                  //前缀
  public static final int api_token_time = 7*24*3600;                         //有效时长(7天)
  public static final boolean api_token_auto = true;                          //自动续期
  
}
