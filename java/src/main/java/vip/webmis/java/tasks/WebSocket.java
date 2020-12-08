package vip.webmis.java.tasks;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;

import vip.webmis.java.Env;
import vip.webmis.java.common.AdminToken;
import vip.webmis.java.common.ApiToken;
import vip.webmis.java.common.Base;
import vip.webmis.java.common.Msg;

@Controller
@ServerEndpoint("/websocket")
public class WebSocket extends Base {

  private static ConcurrentHashMap<String, WebSocket> __socket = new ConcurrentHashMap<>();
  private static ConcurrentHashMap<String, Session> __fds = new ConcurrentHashMap<>();
  private static String __suid = "0"; //系统消息ID
  private static String __uid = "0"; //用户ID
  private static JSONObject __token = null; //Token

  /* 链接 */
  @OnOpen
  public void onOpen(Session session) {
    // 验证
    verify(session);
    // 记录FD
    if(__token!=null && !__token.isEmpty()){
      __socket.put(__token.get("uid").toString(),this);
      __fds.put(__token.get("uid").toString(),session);
    }
  }
  // 验证
  private void verify(Session session){
    HashMap<String, Object> res = null;
    // 参数
    Map<String, List<String>> param = session.getRequestParameterMap();
    String token = param.containsKey("token")?param.get("token").get(0):"";
    if(token.equals("")) __error(session, "Socket参数错误!");
    // 类型
    String type = param.containsKey("type")?param.get("type").get(0):"";
    if(type.equals("admin")) res = AdminToken.socket(token);
    else if(type.equals("api"))res = ApiToken.socket(token);
    else __error(session, "Socket参数错误!");
    
    // 验证
    if(res.get("state").equals(true) || token.equals(Env.key)){
      // 用户ID
      if(token.equals(Env.key)){
        __token = new JSONObject();
        __token.put("uid",__suid);
        __uid = __suid;
      }else{
        __token = JSON.parseObject(JSON.toJSONString(res.get("data")));
        __uid = __token.get("uid").toString();
      }
    }else{
      __error(session,res.get("msg").toString());
    }
  }
  // 错误信息
  private void __error(Session server, String msg) {
    try {
      HashMap<String,Object> res = new HashMap<String,Object>();
      res.put("code",400);
      res.put("msg",msg);
      server.getBasicRemote().sendText(getJSON(res));
      server.close();
    } catch (IOException e) {}
  }

  /* 关闭 */
  @OnClose
  public void onClose() {
    __socket.remove(__uid);
    __fds.remove(__uid);
  }

  /* 消息 */
  @OnMessage
  public void onMessage(String message, Session session) throws IOException {
    // 验证
    verify(session);
    // 路由
    Msg.router(__fds,session,message,__token);
  }
  
}
