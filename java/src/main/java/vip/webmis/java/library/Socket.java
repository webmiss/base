package vip.webmis.java.library;

import java.net.URI;
import java.util.HashMap;

import com.alibaba.fastjson.JSON;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import vip.webmis.java.Env;

/* WebSocket */
public class Socket extends WebSocketClient {

  /* 发送 */
  public static void send(String type, HashMap<String, Object> msg){
    try {
      String url = "ws://"+Env.socket_ip+":"+Env.socket_port+"/websocket?type=admin&token="+Env.key;
      Socket clients = new Socket(new URI(url));
      clients.connect();
      while (!clients.getReadyState().toString().equals("OPEN")) {
        Thread.sleep(300);
      }
      clients.send(JSON.toJSONString(msg));
    } catch (Exception e) {

    }
  }

  /* 客户端 */
  public Socket(URI serverUri) {
    super(serverUri);
  }
  /* 链接 */
  @Override
  public void onOpen(ServerHandshake arg0) {
    // System.out.println("1、链接");
  }
  /* 消息 */
  @Override
  public void onMessage(String message) {
    // System.out.println("2、消息: "+message);
  }
  /* 关闭 */
  @Override
  public void onClose(int code, String reason, boolean remote) {
    // System.out.println("3、关闭");
  }
  /* 错误 */
  @Override
  public void onError(Exception ex) {
    // System.out.println("4、错误");
  }

}
