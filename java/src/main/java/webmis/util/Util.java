package webmis.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.util.DigestUtils;

/* 常用工具 */
public class Util {

  /* Md5加密 */
  public static String Md5(String str) {
    return DigestUtils.md5DigestAsHex(str.getBytes());
  }

  /* 格式化时间 */
  public static String Date(String format) {
    return Date(format, String.valueOf(Time()));
  }
  public static String Date(String format, String timestamp) {
    return new SimpleDateFormat(format).format(new Date(Long.valueOf(timestamp)*1000));
  }

  /* 时间戳 */
  public static long Time() {
    return new Date().getTime()/1000;
  }

  /* String To Timestamp */
  public static long Strtotime(String day) {
    return Strtotime(day, "yyyy-MM-dd HH:mm:ss");
  }
  public static long Strtotime(String day, String format) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat(format);
      Date data = sdf.parse(day);
      return data.getTime()/1000;
    } catch (ParseException e) {
      return 0;
    }
  }

  /* 去首尾空格 */
  public static String Trim(String str){
    return Trim(str, " ");
  }
  public static String Trim(String str, String charlist){
    if (str == null || str.equals("")) return str;
    boolean beginIndexFlag = true;
    boolean endIndexFlag = true;
    do{
        int beginIndex = str.indexOf(charlist) == 0 ? 1 : 0;
        int endIndex = str.lastIndexOf(charlist) + 1 == str.length() ? str.lastIndexOf(charlist) : str.length();
        str = str.substring(beginIndex, endIndex);
        beginIndexFlag = (str.indexOf(charlist) == 0);
        endIndexFlag = (str.lastIndexOf(charlist) + 1 == str.length());
    } while (beginIndexFlag || endIndexFlag);
    return str;
  }

  /* String to ArrayList */
  public static ArrayList<String> Explode(String delimiter, String string) {
    ArrayList<String> list = new ArrayList<String>();
    Collections.addAll(list, string.split(delimiter));
    return list;
  }

  /* ArrayList to String */
  public static String Implode(String glue, ArrayList<String> pieces) {
    String res = String.join(glue, pieces);
    return res;
  }

  /* Array to String */
  public static String Json_encode(Dynamic<?> arr) {
    return JSON.toJSONString(arr.getKey());
  }

  /* String to Array */
  public static JSONObject Json_decode(String str) {
    try{ return JSON.parseObject(str); }catch (Exception e){ return new JSONObject(); }
  }
  public static JSONArray Json_decode_array(String str) {
    try{ return JSON.parseArray(str); }catch (Exception e){ return new JSONArray(); }
  }
  
}
