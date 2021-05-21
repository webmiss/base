package webmis.config;

import java.util.HashMap;

/* 腾讯云配置 */
public class Tencent {

  /* 实时音视频 */
  public static HashMap<String, Object> TRTC() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("SDKAppID", 1400517751);  //AppID
    cfg.put("SecretKey", "f47b43f0dc84c945b684fd3f0f11f818832e34df451757db48de5fd912264845"); //AppKey
    cfg.put("UserID", "administrator");  //管理员账号
    cfg.put("ExpireTime", 86400 * 180);  //userSig有效期
    cfg.put("PlayDomain", "play.webmis.vip"); //播放域名
    cfg.put("PlayType", "http");  //播放类型
    return cfg;
  }

  /* API密钥 */
  public static HashMap<String, Object> CAPI() {
    HashMap<String, Object> cfg = new HashMap<String, Object>();
    cfg.put("AppID", 1258966985);
    cfg.put("SecretId", "AKIDd4HDsHRKwBDySfbGfneEXZKp47uRiiTx");
    cfg.put("SecretKey", "FD0ZtwjFUS9ZhZBWaOwGLNBkBNM6brth");
    return cfg;
  }
  
}
