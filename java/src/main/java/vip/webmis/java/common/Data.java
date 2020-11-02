package vip.webmis.java.common;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/* 数据类 */
public class Data {

  /* 自动编号ID-18位 */
  public static String getId(){
    DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSS");
    LocalDateTime now = LocalDateTime.now();
    return df.format(now);
  }
  
}
