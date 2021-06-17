package webmis.config;

import java.util.HashMap;

/* 阿里云配置 */
public class Aliyun {

  /* RAM访问控制 */
  public static HashMap<String, Object> RAM() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("AccessKeyId", "LTAI5tBxpsyAoe2EV1goV8wW");
    cfg.put("AccessKeySecret", "FhMQw6WRyZbMAsTc9jrlCw4efYh2Qx");
    return cfg;
  }

  /* 对象存储 */
  public static HashMap<String, Object> OSS() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("Endpoint", "oss-cn-chengdu.aliyuncs.com");                 //区域
    cfg.put("Bucket", "webmis-upload");                                 //存储空间
    cfg.put("MaxSize", 100*1024*1024);                                  //最大文件
    cfg.put("ExpireTime", 30);                                          //签名有效时间(秒)
    cfg.put("CallbackUrl", "https://demo-java.webmis.vip/ossCallback"); //回调URL
    cfg.put("CallbackType", "application/json");                        //回调数据类型
    cfg.put("ImgUrl", "http://img.webmis.vip/");                        //图片域名
    return cfg;
  }
  
}
