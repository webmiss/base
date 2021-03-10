package webmis.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.util.DigestUtils;

/* 常用工具 */
public class Util {

  /* Md5加密 */
  public static String md5(String str) {
    return DigestUtils.md5DigestAsHex(str.getBytes());
  }

  /* 格式化时间 */
  public static String date(String format) {
    return date(format, 0);
  }
  public static String date(String format, long time) {
    long t = new Date().getTime();
    t = time!=0?time:t;
    return new SimpleDateFormat(format).format(new Date(t));
  }
  
}
