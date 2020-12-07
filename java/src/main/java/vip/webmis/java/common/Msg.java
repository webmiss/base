package vip.webmis.java.common;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.tasks.WebSocket;

/* 消息类 */
public class Msg extends Base {

  private static ConcurrentHashMap<String, WebSocket> __fds = new ConcurrentHashMap<>();
  private static JSONObject __token = null;
  private static HashMap<String,Object> res = null;

  /* 路由 */
  public static void router(ConcurrentHashMap<String, WebSocket> __fds, WebSocket socket, String msg, JSONObject token){
    // 参数
    __token = token;
    // 数据
    JSONObject data = Inc.json_decode(msg);
    if(data==null || data.isEmpty()){
      res = new HashMap<String,Object>();
      res.put("code",4000);
      res.put("msg","格式错误!");
      socket.send(token.get("uid").toString(),res);
    }
    // 消息
    else if(data.get("type").equals("msg")) msg(socket, data);
    // 心跳
    else{
      res = new HashMap<String,Object>();
      res.put("code",0);
      res.put("msg","成功");
      socket.send(token.get("uid").toString(),res);
    }
  }

  /* 消息 */
  public static void msg(WebSocket socket, JSONObject data){
    // 数据
    System.out.println(__token);
    System.out.println(data);
    // 指定用户
    if(__fds.containsKey(data.get("uid"))){
      res = new HashMap<String,Object>();
      res.put("type","msg");
      res.put("code",0);
      res.put("msg","消息");
      socket.send(data.get("uid").toString(),res);
    }
  }
}
