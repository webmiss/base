package vip.webmis.java.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.util.DigestUtils;

/* 公共类 */
public class Inc {

  /* 时间戳 */
  public static long time() {
    return time("yyyy-MM-dd HH:mm:ss","");
  }
  public static long time(String format, String d) {
    if(d.equals("") || d.equals("")) return new Date().getTime();
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
    try {
      Date date = simpleDateFormat.parse(d);
      return date.getTime();
    }catch(ParseException e){
      return 0;
    }
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

  /* Md5加密 */
  public static String md5(String str) {
    return DigestUtils.md5DigestAsHex(str.getBytes());
  }

  /* JSON转字符串 */
  public static String json_encode(Dynamic<?> arr) {
    return JSON.toJSONString(arr.getKey());
  }

  /* JSON转数组 */
  public static JSONObject json_decode(String str) {
    try{ return JSON.parseObject(str); }catch (Exception e){ return null; }
  }
  public static JSONArray json_decode_array(String str) {
    try{ return JSON.parseArray(str); }catch (Exception e){ return null; }
  }

  /* 数组格式化字符串 */
  public static String implode(String glue, JSONArray arr){
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