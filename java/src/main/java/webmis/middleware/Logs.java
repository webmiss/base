package webmis.middleware;

import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;

import webmis.config.Env;
import webmis.util.Http;

/* 日志 */
@WebListener
public class Logs implements ServletRequestListener {

  /* 访问日志 */
  public void requestInitialized(ServletRequestEvent se) {
    // 是否记录
    if(!Env.log_on) return;
    // 数据
    HttpServletRequest request = (HttpServletRequest) se.getServletRequest();
    HashMap<String, Object> data = new HashMap<String, Object>();
    data.put("ip", Http.IpAddress(request));
    data.put("method", "");
    data.put("path", request.getRequestURI());
    data.put("user_agent", request.getHeader("User-Agent"));
    data.put("time", new Date().getTime());
    webmis.service.Logs.Log(data);
  }

	public void requestDestroyed(ServletRequestEvent se) {
	}
  
}
