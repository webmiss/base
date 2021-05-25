package webmis.config;

import java.util.HashMap;

/* 阿里云配置 */
public class Aliyun {

  /* RAM访问控制 */
  public static HashMap<String, Object> RAM() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("AccessKeyId", "LTAI5t9BgHZ11gu1WvTdTSns");
    cfg.put("AccessKeySecret", "WIsk3M2U7MuE526SIuc5xAdxOc2Pge");
    cfg.put("Endpoint", "oss-cn-chengdu.aliyuncs.com");
    cfg.put("Bucket", "cuixs-upload-test");
    cfg.put("ImgUrl", "http://img.cuixs.net/");
    return cfg;
  }
  
}
