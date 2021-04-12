package webmis.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class Http {

  private final static String UNKNOWN = "unknown";
  private static final String[] HEAD_INFO = {"X-Forwarded-For", "Proxy-Client-IP", "WL-Proxy-Client-IP", "HTTP_X_FORWARDED_FOR", "HTTP_X_FORWARDED", "HTTP_X_CLUSTER_CLIENT_IP", "HTTP_CLIENT_IP", "HTTP_FORWARDED_FOR", "HTTP_FORWARDED", "HTTP_VIA", "REMOTE_ADDR", "PROXY_FORWARDED_FOR", "X-Real-IP"};

  /* Request */
  public static HttpServletRequest Request() {
    ServletRequestAttributes requestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
    if(requestAttributes!=null){
       return requestAttributes.getRequest();
    }
    return null;
  }

  /* Response */
  public static HttpServletResponse Response() {
    ServletRequestAttributes requestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
    if(requestAttributes!=null){
       return requestAttributes.getResponse();
    }
    return null;
  }

  /* 获取IP */
  public static String IpAddress(HttpServletRequest request) {
    for (String header : HEAD_INFO) {
      String ip = request.getHeader(header);
      if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
        if (ip.contains(",")) {
          String[] ips = ip.split(",");
          for (String s : ips) {
            if (!(UNKNOWN.equalsIgnoreCase(s))) {
              ip = s;
              break;
            }
          }
        }
        return ip;
      }
    }
    return request.getRemoteAddr();
}
  
}
