package webmis.util;

/* 设备信息 */
public class Os {

  /* OS */
  public static String System(String user_agent) {
    if(user_agent.contains("win") || user_agent.contains("Win"))
      return "Windows";
    else if(user_agent.contains("linux") || user_agent.contains("Linux"))
      return "Linux";
    else if(user_agent.contains("Mac"))
      return "MacOS";
    else if(user_agent.contains("unix") || user_agent.contains("Unix") || user_agent.contains("BSD") || user_agent.contains("HPUX"))
      return "Unix";
    else
      return "Other";
  }

  /* Browser */
  public static String Browser(String user_agent) {
    if(user_agent.contains("Maxthon") || user_agent.contains("MSIE"))
      return "IE";
    else if(user_agent.contains("Chrome"))
      return "Chrome";
    else if(user_agent.contains("Firefox") || user_agent.contains("Mozilla"))
      return "Firefox";
    else if(user_agent.contains("Opera"))
      return "Opera";
    else if(user_agent.contains("Safari"))
      return "Safari";
    else if(user_agent.contains("Netscape"))
      return "Netscape";
    else
      return "Other";
  }
  
}
