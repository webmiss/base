package webmis.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.DigestUtils;
import org.springframework.util.FileCopyUtils;

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

  /* 加载文件 */
  public static String loadFile(String file) {
    try {
      ClassPathResource f = new ClassPathResource(file);
      byte[]  bytes = FileCopyUtils.copyToByteArray(f.getInputStream());
      return new String(bytes);
    } catch (IOException e) {
      System.out.println("[File] Load: "+e.getMessage());
      return "";
    }
  }
  
}
