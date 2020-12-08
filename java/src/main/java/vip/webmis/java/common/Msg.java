package vip.webmis.java.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import javax.websocket.Session;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/* 消息类 */
public class Msg extends Base {

  private static ConcurrentHashMap<String, Session> __fds = new ConcurrentHashMap<>();
  private static JSONObject __token = null;
  private static HashMap<String, Object> res = null;

  /* 路由 */
  public static void router(ConcurrentHashMap<String, Session> fds, Session socket, String msg, JSONObject token) throws IOException {
    // 参数
    __fds = fds;
    __token = token;
    // 数据
    JSONObject data = Inc.json_decode(msg);
    if (data == null || data.isEmpty()) {
      res = new HashMap<String, Object>();
      res.put("code", 4000);
      res.put("msg", "格式错误!");
      socket.getBasicRemote().sendText(JSON.toJSONString(res));
    }
    // 消息
    else if (data.get("type").equals("msg"))
      msg(socket, data);
    // 心跳
    else {
      res = new HashMap<String, Object>();
      res.put("type", "");
      res.put("code", 0);
      res.put("msg", "成功");
      socket.getBasicRemote().sendText(JSON.toJSONString(res));
    }
  }

  /* 消息 */
  public static void msg(Session socket, JSONObject data) throws IOException {
    // 数据
    System.out.println(__token);
    System.out.println(data);
    // 指定用户
    if(__fds.containsKey(data.get("uid"))){
      res = new HashMap<String,Object>();
      res.put("type","msg");
      res.put("code",0);
      res.put("msg","消息");
      __fds.get(data.get("uid")).getBasicRemote().sendText(JSON.toJSONString(res));
    }
  }
}
