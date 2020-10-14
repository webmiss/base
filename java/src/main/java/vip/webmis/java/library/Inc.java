package vip.webmis.java.library;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.util.DigestUtils;

/* 公共函数 */
public class Inc {

  /* 格式化时间 */
  public static String date(String format){
    DateTimeFormatter df = DateTimeFormatter.ofPattern(format);
    LocalDateTime now = LocalDateTime.now();
    return df.format(now);
  }

  /* Md5加密 */
  public static String md5(String str){
    return DigestUtils.md5DigestAsHex(str.getBytes());
  }
  
}
