package webmis.library.tencent;

import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import webmis.config.Tencent;
import webmis.library.Curl;

/* 实时音视频 */
public class Trtc extends Signature {

  public static int SdkAppId = 0;

  /* 公共配置 */
  public static void Init() {
    HashMap<String, Object> cfg = Tencent.TRTC();
    ApiUrl = "https://trtc.tencentcloudapi.com/";
    Host = "trtc.tencentcloudapi.com";
    Service = "trtc";
    Version = "2019-07-22";
    SdkAppId = Integer.valueOf(cfg.get("SDKAppID").toString());
  }

  /* 房间-查询 */
  public static JSONObject RoomList(long StartTime, long EndTime) {
    // 参数
    Init();
    Action = "DescribeRoomInformation";
    // 数据
    JSONObject data = new JSONObject();
    data.put("SdkAppId", String.valueOf(SdkAppId));
    data.put("StartTime", StartTime);
    data.put("EndTime", EndTime);
    // 请求头
    HashMap<String, Object> header = V3Header(data);
    return Curl.Request(ApiUrl, data.toString(), "POST", header);
  }

  /* 房间-解散 */
  public static JSONObject RoomDismiss(String roomId) {
    // 参数
    Init();
    Action = "DismissRoomByStrRoomId";
    // 数据
    JSONObject data = new JSONObject();
    data.put("SdkAppId", String.valueOf(SdkAppId));
    data.put("RoomId", roomId);
    // 请求头
    HashMap<String, Object> header = V3Header(data);
    return Curl.Request(ApiUrl, data.toString(), "POST", header);
  }
  
}
