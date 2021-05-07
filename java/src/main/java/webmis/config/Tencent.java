package webmis.config;

import java.util.HashMap;

/* 腾讯云配置 */
public class Tencent {

  /* 实时音视频 */
  public static HashMap<String, Object> TRTC() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("SDKAppID", 1400517751);  //AppID
    cfg.put("SecretKey", "f47b43f0dc84c945b684fd3f0f11f818832e34df451757db48de5fd912264845"); //AppKey
    cfg.put("PlayDomain", "play.webmis.vip"); //播放域名
    cfg.put("PlayType", "http");  //播放类型
    return cfg;
  }
  
}
