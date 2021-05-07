package webmis.library.tencent;

import java.util.HashMap;
import java.util.Map.Entry;

import webmis.config.Tencent;
import webmis.service.Base;
import webmis.util.Util;

/* 即时通信 */
public class Im extends Base {

  /* 鉴权票据 */
  public String UserSig(Long userId) {
    return UserSig(userId, 86400*180);
  }
  public String UserSig(Long userId, int expire) {
    // 配置
    HashMap<String, Object> cfg = Tencent.TRTC();
    // 参数
    HashMap<String, String> param = new HashMap<String, String>();
    param.put("TLS.ver", "2.0");
    param.put("TLS.identifier", String.valueOf(userId));
    param.put("TLS.sdkappid", String.valueOf(cfg.get("SDKAppID")));
    param.put("TLS.expire", String.valueOf(expire));
    param.put("TLS.time", String.valueOf(Util.Time()));
    param.put("TLS.sig", hmacsha256(param, cfg.get("SecretKey").toString()));
    Print(param);
    return "";
  }

  /* 获取Sig */
  private String hmacsha256(HashMap<String, String> param, String key) {
    String content = "";
    String k,v;
    for(Entry<String, String> entry : param.entrySet()){
      k = entry.getKey();
      v = entry.getValue();
      if(k.equals("TLS.ver") || k.equals("TLS.sig")) continue;
      content += k+":"+v+"\n";
    }
    
    Print(content);
    return "";
  }
  
}
