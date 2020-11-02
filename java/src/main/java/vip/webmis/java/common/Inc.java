package vip.webmis.java.common;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.util.DigestUtils;

/* 公共类 */
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

  /* JSON转字符串 */
  public static String json_encode(Dynamic<?> arr) {
    return JSON.toJSONString(arr);
  }

  /* JSON转数组 */
  public static JSONObject json_decode(String str) {
    try{ return JSON.parseObject(str); }catch (Exception e){ return null; }
  }
  public static JSONArray json_decode_array(String str) {
    try{ return JSON.parseArray(str); }catch (Exception e){ return null; }
  }

  /* 数组格式化字符串 */
  public static String implode(String glue, List<Object> arr){
    String str="";
    for(int i=0; i<arr.size(); i++){
      str += String.valueOf(arr.get(i))+glue;
    }
    return str.substring(0,str.length()-1);
  }

  /* 去除首尾字符 */
  public static String trim(String str){
    return trim(str, " ");
  }
  public static String trim(String str, String glue){
    if (str == null || str.equals("")) return str;
    boolean beginIndexFlag = true;
    boolean endIndexFlag = true;
    do{
        int beginIndex = str.indexOf(glue) == 0 ? 1 : 0;
        int endIndex = str.lastIndexOf(glue) + 1 == str.length() ? str.lastIndexOf(glue) : str.length();
        str = str.substring(beginIndex, endIndex);
        beginIndexFlag = (str.indexOf(glue) == 0);
        endIndexFlag = (str.lastIndexOf(glue) + 1 == str.length());
    } while (beginIndexFlag || endIndexFlag);
    return str;
  }
  
}