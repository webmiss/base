package webmis.library.tencent;

import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import webmis.config.Tencent;
import webmis.library.Curl;
import webmis.service.Base;
import webmis.util.Base64;
import webmis.util.Hmac;
import webmis.util.Util;

/* 即时通信 */
public class Im extends Base {

  final static String Url = "https://console.tim.qq.com/v4/";
  final static String ContentType = "json";

  /* 群组-列表 */
  public static JSONObject GroupList() {
    String url = GetURL("group_open_http_svc/get_appid_group_list");
    return Curl.PostJson(url, new JSONObject());
  }
  /* 群组-创建 */
  public static JSONObject GroupCreate(JSONObject data) {
    String url = GetURL("group_open_http_svc/create_group");
    return Curl.PostJson(url, data);
  }
  /* 群组-解散 */
  public static JSONObject GroupDestroy(JSONObject data) {
    String url = GetURL("group_open_http_svc/destroy_group");
    return Curl.PostJson(url, data);
  }

  /* 请求地址 */
  public static String GetURL(String apiUrl) {
    HashMap<String, Object> cfg = Tencent.TRTC();
    String userSig = UserSig(cfg.get("UserID"));
    String random = String.valueOf(Util.Time());
    return Url+apiUrl+"?sdkappid="+cfg.get("SDKAppID")+"&identifier="+cfg.get("UserID")+"&usersig="+userSig+"&random="+random+"&contenttype="+ContentType;
  }

  /* 鉴权票据 */
  public static String UserSig(Object userId) {
    return UserSig(userId, 0);
  }
  public static String UserSig(Object userId, int expire) {
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

  /* 验证签名 */
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
    String content = "TLS.identifier:"+param.get("TLS.identifier")+"\n"
    +"TLS.sdkappid:"+param.get("TLS.sdkappid")+"\n"
    +"TLS.time:"+param.get("TLS.time")+"\n"
    +"TLS.expire:"+param.get("TLS.expire")+"\n";
    return Base64.Encode(Hmac.Sha256(content, key));
  }
  
}
