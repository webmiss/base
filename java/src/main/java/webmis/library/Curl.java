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

  /* PostJson */
  static public JSONObject PostJson(String url, JSONObject data) {
    return PostJson(url, data, new HashMap<String, Object>());
  }
  static public JSONObject PostJson(String url, JSONObject data, HashMap<String, Object> header) {
    OutputStreamWriter out =null;
    BufferedReader reader = null;
    String response = "";
    JSONObject res = new JSONObject();
    // 请求头
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("Content-Type", "application/json; charset=utf-8"); //JSON方式
    param = Util.ArrayMerge(param, header);
    // 数据
    String json = data.toString();
    // 发送
    try {
      URL httpUrl = new URL(url);
      // 建立连接
      HttpURLConnection conn = (HttpURLConnection) httpUrl.openConnection();
      conn.setRequestMethod("POST");
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
      out.write(json);
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

    // CloseableHttpClient httpclient = null;
    // CloseableHttpResponse httpresponse = null;
    // httpclient = HttpClients.createDefault();
    // HttpPost curl = new HttpPost(url);
    // StringEntity se = new StringEntity(json, ContentType.create("text/json", "UTF-8"));
    // curl.setEntity(se);
    // try {
    //   httpresponse = httpclient.execute(curl);
    //   httpclient.close();
    //   String res = EntityUtils.toString(httpresponse.getEntity());
    //   return res.length()>0?Util.JsonDecode(res):null;
    // } catch (Exception e) {
    //   return null;
    // }
    
  }
  
}
