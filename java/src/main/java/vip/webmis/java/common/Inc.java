package vip.webmis.java.common;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.util.DigestUtils;

/* 公共函数 */
public class Inc {

  /* 格式化时间 */
  public static String date(String format) {
    String time = null;
    return date(format, time);
  }

  public static String date(String format, String time) {
    DateTimeFormatter df = DateTimeFormatter.ofPattern(format);
    LocalDateTime now = LocalDateTime.now();
    return df.format(time != null ? Timestamp.valueOf(time).toLocalDateTime() : now);
  }

  /* Md5加密 */
  public static String md5(String str) {
    return DigestUtils.md5DigestAsHex(str.getBytes());
  }

  /* Json转-转字符串 */
  public static String json_encode(Dynamic<?> arr) {
    return JSON.toJSONString(arr);
  }

  /* Json-转数组 */
  public static JSONObject json_decode(String str) {
    try{ return JSON.parseObject(str); }catch (Exception e){ return null; }
  }
  public static JSONArray json_decode_array(String str) {
    try{ return JSON.parseArray(str); }catch (Exception e){ return null; }
  }

  /* 自动编号ID-18位 */
  public static String getId(){
    DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSSS");
    LocalDateTime now = LocalDateTime.now();
    return df.format(now);
  }
  
}
