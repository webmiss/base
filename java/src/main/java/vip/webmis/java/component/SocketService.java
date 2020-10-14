package vip.webmis.java.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SocketService {

  /* 构造函数 */
  @Autowired
  public SocketService(){
    System.out.println("Socket启动");
  }
  
}
