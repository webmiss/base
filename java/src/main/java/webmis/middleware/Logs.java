package webmis.middleware;

import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;

import webmis.config.Env;

/* 日志 */
@WebListener
public class Logs implements ServletRequestListener {

  /* 访问日志 */
  public void requestInitialized(ServletRequestEvent se) {
    HttpServletRequest request = (HttpServletRequest) se.getServletRequest();
    // 参数
    String ip = request.getRemoteAddr();
    String method = request.getMethod();
    String path = request.getRequestURI();
    String user_agent = request.getHeader("User-Agent");
    // 写入-数据库
    if(Env.log_db) {
      webmis.service.Logs.LogsDB(ip, method, path, user_agent);
    }
    // 写入-文件
    if(Env.log_file) {
      HashMap<String, Object> data = new HashMap<String, Object>();
      data.put("ip", ip);
      data.put("method", method);
      data.put("path", path);
      data.put("user_agent", user_agent);
      data.put("time", new Date().getTime());
      webmis.service.Logs.Log(data);
    }
  }

	public void requestDestroyed(ServletRequestEvent se) {
	}
  
}
