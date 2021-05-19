package webmis.library;

import com.alibaba.fastjson.JSONObject;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import webmis.service.Base;
import webmis.util.Util;

/* 请求 */
public class Curl extends Base {

  /* PostJson */
  static public JSONObject PostJson(String url, JSONObject data) {
    String json = data.toString();
    CloseableHttpClient httpclient = null;
    CloseableHttpResponse httpresponse = null;
    httpclient = HttpClients.createDefault();
    HttpPost curl = new HttpPost(url);
    StringEntity se = new StringEntity(json, ContentType.create("text/json", "UTF-8"));
    curl.setEntity(se);
    try {
      httpresponse = httpclient.execute(curl);
      httpclient.close();
      String res = EntityUtils.toString(httpresponse.getEntity());
      return res.length()>0?Util.JsonDecode(res):null;
    } catch (Exception e) {
      return null;
    }
  }
  
}
