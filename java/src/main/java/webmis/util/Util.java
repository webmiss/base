package webmis.util;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import webmis.service.Base;

/* 常用工具 */
@SuppressWarnings("unchecked")
public class Util extends Base {

  /* 执行Linux命令 */
  public static JSONArray Exec(String cmd) {
    JSONArray res = new JSONArray();
    try {
      Process ps = Runtime.getRuntime().exec(new String[]{"sh", "-c", cmd});
      InputStreamReader ir = new InputStreamReader(ps.getInputStream());
      LineNumberReader input = new LineNumberReader(ir);
      String line;
      while ((line = input.readLine ()) != null){
        res.add(line);
      }
      ir.close();
      input.close();
      ps.destroy();
    } catch (IOException e) {}
    return res;
  }

  /* 字符串长度 */
  public static int Len(String val) {
    return val.length();
  }

  /* 格式化时间 */
  public static String Date(String format) {
    if(format.equals("")) format = "yyyy-MM-dd HH:mm:ss";
    return Date(format, String.valueOf(Time()));
  }
  public static String Date(String format, String timestamp) {
    return new SimpleDateFormat(format).format(new Date(Long.valueOf(timestamp)*1000));
  }
  public static String DateFormat(String format) {
    return DateFormat(format, "0s");
  }
  public static String DateFormat(String format, String duration) {
    int n = duration.length();
    int l = Integer.valueOf(duration.substring(0,n-1));
    String r = duration.substring(n-1);
    // 年、月、周、日、时、分、秒
    Calendar c = Calendar.getInstance();
    if(r.equals("y")) c.add(Calendar.YEAR, l);
    else if(r.equals("m")) c.add(Calendar.MONTH, l);
    else if(r.equals("w")) c.add(Calendar.WEDNESDAY, l);
    else if(r.equals("d")) c.add(Calendar.DATE, l);
    else if(r.equals("h")) c.add(Calendar.HOUR, l);
    else if(r.equals("i")) c.add(Calendar.MINUTE, l);
    else if(r.equals("s")) c.add(Calendar.SECOND, l);
    else c.add(Calendar.SECOND, 0);
    SimpleDateFormat sf = new SimpleDateFormat(format);
    return sf.format(c.getTime());
  }

  /* 时间戳 */
  public static long Time() {
    return new Date().getTime()/1000;
  }

  /* String To Timestamp */
  public static long StrToTime(String day) {
    return StrToTime(day, "yyyy-MM-dd HH:mm:ss");
  }
  public static long StrToTime(String day, String format) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat(format);
      Date data = sdf.parse(day);
      long t = data.getTime()/1000;
      return t>0?t:0;
    } catch (ParseException e) {
      return 0;
    }
  }

  /* Timestamp To GmtIso8601 */
  public static String GmtISO8601(long timestamp) {
    Date date = new Date(timestamp*1000);
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
    String str = df.format(date);
    return str;
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
  public static String Implode(String glue, JSONArray pieces) {
    String str = "";
    for(Object val : pieces){
      str += val.toString() + glue;
    }
    str = str.length()>0?str.substring(0,str.length()-glue.length()):"";
    return str;
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
