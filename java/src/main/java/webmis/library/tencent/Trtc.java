package webmis.library.tencent;

import com.alibaba.fastjson.JSONObject;

/* 实时音视频 */
public class Trtc extends Signature {

  /* 房间-查询 */
  public static void RoomList() {
    JSONObject data = new JSONObject();
    V3Header(data);
  }
  
}
