package webmis.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;

import webmis.config.Env;
import webmis.util.Util;

@Controller
@ServerEndpoint("/websocket")
public class Socket extends Base {

  public static ConcurrentHashMap<String, Session> clients = new ConcurrentHashMap<>(); //连接

  /* 路由 */
  @SuppressWarnings("unchecked")
  public void router(String uid, Session conn, String msg) {
    HashMap<String, Object> data = JSONObject.parseObject(msg, HashMap.class);
    if(data.get("type").equals("msg")){
      getMsg(uid, conn, data);
    }else{
      HashMap<String, Object> res = new HashMap<String, Object>();
      res.put("type", "");
      res.put("code", 0);
      res.put("msg", "成功");
      send(conn, res);
    }
  }

  /* 消息 */
  public void getMsg(String uid, Session conn, HashMap<String, Object> msg) {
    Print(uid, msg);
    // 群发
    if(uid.equals("0")) {
      sendAll(msg);
      return ;
    }
    // 单发
    HashMap<String, Object> data = new HashMap<String, Object>();
    data.put("code", 0);
    data.put("type", "msg");
    data.put("msg", "成功");
    data.put("time", Util.Date(""));
    send(conn, data);
  }

  /* 群发 */
  public void sendAll(HashMap<String, Object> data) {
    for(Entry<String, Session> obj : clients.entrySet()) {
      send(obj.getValue(), data);
    }
  }

  /* 单发 */
  public void send(Session conn, HashMap<String, Object> data) {
    String res = Util.JsonEncode(data);
    try {
      conn.getBasicRemote().sendText(res);
    } catch (IOException e) {
      Print("[Socket] Send:", e.getMessage());
    }
  }

  /* 链接 */
  @OnOpen
  public void onOpen(Session session) {
    // 验证
    String uid = verify(session.getRequestParameterMap());
    // 保存
    clients.put(uid, session);
  }
  /* 消息 */
  @OnMessage
  public void onMessage(String message, Session session) {
    // 验证
    String uid = verify(session.getRequestParameterMap());
    if(uid==""){
      try { session.close(); } catch (IOException e) {}
      return;
    }
    // 路由
    router(uid, session, message);
  }
  /* 关闭 */
  @OnClose
  public void onClose(Session session) {
    String uid;
    Session conn;
    // 移除
    for(Entry<String, Session> obj : clients.entrySet()) {
      uid = obj.getKey();
      conn = obj.getValue();
      if(conn == session){
        clients.remove(uid);
        break;
      }
    }
  }

  /* 验证 */
  private String verify(Map<String, List<String>> param) {
    // 参数
    String type = param.containsKey("type")?param.get("type").get(0):"";
    String token = param.containsKey("token")?param.get("token").get(0):"";
    if(type.isEmpty() || token.isEmpty()) return "";
    // 验证
    if(token.equals(Env.key)){
      return "0";
    }else if(type.equals("api")){
      HashMap<String, Object> tData = ApiToken.Token(token);
      if(tData.isEmpty()) return "";
      return tData.get("uid").toString();
    }else if(type.equals("admin")){
      HashMap<String, Object> tData = AdminToken.Token(token);
      if(tData.isEmpty()) return "";
      return tData.get("uid").toString();
    }
    return "";
  }
  
}
