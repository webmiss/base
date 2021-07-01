package webmis.util;

/* 设备信息 */
public class Os {

  /* OS */
  public static String System(String user_agent) {
    if(user_agent.contains("Win64") || user_agent.contains("Windows NT"))
      return "Windows";
    else if(user_agent.contains("Linux"))
      return "Linux";
    else if(user_agent.contains("Mac OS"))
      return "MacOS";
    else if(user_agent.contains("Unix"))
      return "Unix";
    else
      return "Other";
  }

  /* Browser */
  public static String Browser(String user_agent) {
    if(user_agent.contains("MSIE"))
      return "IE";
    else if(user_agent.contains("Netscape"))
      return "Netscape";
    else if(user_agent.contains("Opera"))
      return "Opera";
    else if(user_agent.contains("Firefox"))
      return "Firefox";
    else if(user_agent.contains("Chrome"))
      return "Chrome";
    else if(user_agent.contains("Safari"))
      return "Safari";
    else
      return "Other";
  }
  
}
