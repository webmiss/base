package webmis.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

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

  /* String to ArrayList */
  public static ArrayList<String> explode(String delimiter, String string) {
    ArrayList<String> list = new ArrayList<String>();
    Collections.addAll(list, string.split(delimiter));
    return list;
  }

  /* ArrayList to String */
  public static String implode(String glue, ArrayList<String> pieces) {
    String res = String.join(glue, pieces);
    return res;
  }

  /* Array to String */
  public static String json_encode(Dynamic<?> arr) {
    return JSON.toJSONString(arr.getKey());
  }

  /* String to Array */
  public static JSONObject json_decode(String str) {
    try{ return JSON.parseObject(str); }catch (Exception e){ return new JSONObject(); }
  }
  public static JSONArray json_decode_array(String str) {
    try{ return JSON.parseArray(str); }catch (Exception e){ return new JSONArray(); }
  }
  
}
