package vip.webmis.java.common;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.util.DigestUtils;

/* 公共函数 */
public class Inc {

  /* 格式化时间 */
  public static String date(String format){
    String time=null;
    return date(format,time);
  }
  public static String date(String format, String time){
    DateTimeFormatter df = DateTimeFormatter.ofPattern(format);
    LocalDateTime now = LocalDateTime.now();
    return df.format(time!=null?Timestamp.valueOf(time).toLocalDateTime():now);
  }

  /* Md5加密 */
  public static String md5(String str){
    return DigestUtils.md5DigestAsHex(str.getBytes());
  }
  
}
