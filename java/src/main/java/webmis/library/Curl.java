package webmis.library;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSONObject;

import webmis.service.Base;
import webmis.util.Util;

/* 请求 */
@SuppressWarnings("unchecked")
public class Curl extends Base {

  /* GET、POST、PUT、HEAD、DELETE */
  static public JSONObject Request(String url) {
    return Request(url, "", "GET", new HashMap<String, Object>());
  }
  static public JSONObject Request(String url, String data) {
    return Request(url, data, "GET", new HashMap<String, Object>());
  }
  static public JSONObject Request(String url, String data, String method) {
    return Request(url, data, method, new HashMap<String, Object>());
  }
  static public JSONObject Request(String url, String data, String method, HashMap<String, Object> header) {
    OutputStreamWriter out =null;
    BufferedReader reader = null;
    String response = "";
    JSONObject res = new JSONObject();
    // 请求头
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("Content-Type", "application/json; charset=utf-8"); //JSON方式
    param = Util.ArrayMerge(param, header);
    // 发送
    try {
      URL httpUrl = new URL(url);
      // 建立连接
      HttpURLConnection conn = (HttpURLConnection) httpUrl.openConnection();
      conn.setRequestMethod(method);
      conn.setUseCaches(false);
      conn.setInstanceFollowRedirects(true);
      conn.setDoOutput(true);
      conn.setDoInput(true);
      for(Entry<String, Object> entry : param.entrySet()){
        conn.setRequestProperty(entry.getKey(), String.valueOf(entry.getValue()));
      }
      conn.connect();
      // POST请求
      out = new OutputStreamWriter(
      conn.getOutputStream());
      out.write(data);
      out.flush();
      // 读取响应
      reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String lines;
      while ((lines = reader.readLine()) != null) {
        lines = new String(lines.getBytes(), "utf-8");
        response+=lines;
      }
      reader.close();
      conn.disconnect();
      // 结果
      if(response.length()>0){
        res = Util.JsonDecode(response);
      }
      return res;
    } catch (Exception e) {
      return null;
    }
  }
  
}
