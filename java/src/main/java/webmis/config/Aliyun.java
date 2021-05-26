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
    cfg.put("Endpoint", "oss-cn-chengdu.aliyuncs.com");
    cfg.put("Bucket", "webmis-upload");
    cfg.put("ImgUrl", "http://img.webmis.vip/");
    return cfg;
  }
  
}
