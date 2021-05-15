package webmis.util;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.io.UnsupportedEncodingException;

public class Url {

  /* 编码 */
  public static String Encode(String data) {
    if(data == null) return "";
    try {
      return URLEncoder.encode(data, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      return "";
    }
  }

  /* 解码 */
  public static String Decode(String data) {
    if(data == null) return "";
    try {
      return URLDecoder.decode(data, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      return "";
    }
  }
  
}
