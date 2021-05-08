package webmis.library.tencent;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Set;

import com.alibaba.fastjson.JSONObject;

import webmis.config.Tencent;
import webmis.service.Base;
import webmis.util.Base64;
import webmis.util.Hmac;
import webmis.util.Util;

/* 即时通信 */
public class Im extends Base {

  /* 鉴权票据 */
  public static String UserSig(Long userId) {
    return UserSig(userId, 0);
  }
  public static String UserSig(Long userId, int expire) {
    // 配置
    HashMap<String, Object> cfg = Tencent.TRTC();
    if(expire==0) expire=Integer.valueOf(cfg.get("ExpireTime").toString());
    // 参数
    HashMap<String, String> param = new HashMap<String, String>();
    param.put("TLS.ver", "2.0");
    param.put("TLS.identifier", String.valueOf(userId));
    param.put("TLS.sdkappid", String.valueOf(cfg.get("SDKAppID")));
    param.put("TLS.expire", String.valueOf(expire));
    param.put("TLS.time", String.valueOf(Util.Time()));
    // 签名
    param.put("TLS.sig", hmacsha256(param, cfg.get("SecretKey").toString()));
    // 压缩
    byte[] data = Base64.Compress(Util.JsonEncode(param).getBytes());
    return Base64.UrlEncode(data);
  }

  /* 验证 */
  @SuppressWarnings("unchecked")
  public static long VerifySig(long userId, String userSig) {
    // 解码
    byte[] base64 = Base64.UrlDecode(userSig);
    // 解压
    String un_sig = Base64.UnCompress(base64);
    JSONObject json = Util.JsonDecode(un_sig);
    HashMap<String, String> data = JSONObject.parseObject(json.toString(), HashMap.class);
    // 配置
    HashMap<String, Object> cfg = Tencent.TRTC();
    if(!String.valueOf(cfg.get("SDKAppID")).equals(data.get("TLS.sdkappid").toString())) return 0;
    if(!String.valueOf(userId).equals(data.get("TLS.identifier").toString())) return 0;
    // 是否过期
    long now_time = Util.Time();
    long out_time = Long.valueOf(data.get("TLS.time").toString()) + Long.valueOf(data.get("TLS.expire").toString());
    if(now_time > out_time) return 0;
    // 验证Sig
    String sig = hmacsha256(data, cfg.get("SecretKey").toString());
    if(!sig.equals(data.get("TLS.sig").toString())) return 0;
    return out_time - now_time;
  }

  /* 获取Sig */
  private static String hmacsha256(HashMap<String, String> param, String key) {
    // 排序
    Set<String> arr = param.keySet();
    String[] keys = arr.toArray(new String[arr.size()]);
    Arrays.sort(keys);
    // 拼接
    String content = "";
    for(String k:keys){
      if(k.equals("TLS.ver") || k.equals("TLS.sig")) continue;
      content += k + ":" + param.get(k).toString() + "\n";
    }
    return Base64.Encode(Hmac.Sha256(content, key));
  }
  
}
