package webmis.library;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;

import com.alibaba.fastjson.JSON;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import webmis.config.Env;

/* Socket客户端 */
public class Socket extends WebSocketClient {

  /* 发送 */
  public static void Send(String type, HashMap<String, Object> data) {
    webmis.config.Socket cfg = new webmis.config.Socket();
    String url = cfg.type+"://"+cfg.host+":"+cfg.port+"/"+cfg.url+"?type="+type+"&token="+Env.key;
    try {
      Socket ws = new Socket(new URI(url));
      ws.connect();
      while (!ws.getReadyState().toString().equals("OPEN")) {
        // try { Thread.sleep(100); } catch (InterruptedException e) { }
      }
      ws.send(JSON.toJSONString(data));
    } catch (URISyntaxException e) {
      System.out.println("[Socket] Client: "+e.getMessage());
    }
  }

  /* 构造函数 */
  public Socket(URI url) {
    super(url);
  }
  @Override
  public void onOpen(ServerHandshake shake) {}
  @Override
  public void onMessage(String msg) {}
  @Override
  public void onClose(int paramInt, String paramString, boolean paramBoolean) {}
  @Override
  public void onError(Exception e) {}
}
