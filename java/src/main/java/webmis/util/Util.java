package webmis.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.util.DigestUtils;

/* 常用工具 */
@SuppressWarnings("unchecked")
public class Util {

  /* Md5加密 */
  public static String Md5(String str) {
    return DigestUtils.md5DigestAsHex(str.getBytes());
  }

  /* 格式化时间 */
  public static String Date(String format) {
    if(format.equals("")) format = "yyyy-MM-dd HH:mm:ss";
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
      long time = data.getTime()/1000;
      return time>0?time:0;
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
  public static String JsonEncode(Object arr) {
    return JSON.toJSONString(arr);
  }

  /* String to Array */
  public static JSONObject JsonDecode(String str) {
    try{
      return JSON.parseObject(str);
    }catch (Exception e){
      return new JSONObject();
    }
  }
  public static JSONArray JsonDecodeArray(String str) {
    try{
      return JSON.parseArray(str);
    }catch (Exception e){
      return new JSONArray();
    }
  }

  /* 合并数组 */
  public static HashMap<String, Object> ArrayMerge(HashMap<String, Object>... arrays) {
    HashMap<String, Object> res = new HashMap<String, Object>();
    for(HashMap<String, Object> arr:arrays){
      for(Entry<String, Object> entry:arr.entrySet()){
        res.put(entry.getKey(), entry.getValue());
      }
    }
    return res;
  }
  
}
