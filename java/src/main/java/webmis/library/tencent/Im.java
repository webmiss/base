package webmis.library.tencent;

import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import webmis.config.Tencent;
import webmis.library.Curl;
import webmis.util.Util;

/* 即时通信 */
public class Im extends Signature {

  /* 请求地址 */
  public static String GetURL(String apiUrl) {
    HashMap<String, Object> cfg = Tencent.TRTC();
    String userSig = UserSig(cfg.get("UserID"));
    String random = String.valueOf(Util.Time());
    return "https://console.tim.qq.com/v4/"+apiUrl+"?sdkappid="+cfg.get("SDKAppID")+"&identifier="+cfg.get("UserID")+"&usersig="+userSig+"&random="+random+"&contenttype=json";
  }

  /* 群组-列表 */
  public static JSONObject GroupList() {
    String url = GetURL("group_open_http_svc/get_appid_group_list");
    return Curl.Request(url, "[]", "POST");
  }
  /* 群组-创建 */
  public static JSONObject GroupCreate(JSONObject data) {
    String url = GetURL("group_open_http_svc/create_group");
    return Curl.Request(url, data.toString(), "POST");
  }
  /* 群组-解散 */
  public static JSONObject GroupDestroy(JSONObject data) {
    String url = GetURL("group_open_http_svc/destroy_group");
    return Curl.Request(url, data.toString(), "POST");
  }
  
}
