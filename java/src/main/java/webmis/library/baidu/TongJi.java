package webmis.library.baidu;

import java.util.HashMap;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import webmis.config.Baidu;
import webmis.library.Curl;
import webmis.service.Base;
import webmis.util.Util;

/* 百度统计 */
@SuppressWarnings("unchecked")
public class TongJi extends Base {

  static final private String Url = "https://api.baidu.com/json/tongji/v1/";

  /* 公共配置 */
  public static String GetData() {
    return GetData(null);
  }
  public static String GetData(HashMap<String, Object> body) {
    HashMap<String, Object> cfg = Baidu.TongJi();
    HashMap<String, Object> json = new HashMap<String, Object>();
    HashMap<String, Object> header = new HashMap<String, Object>();
    header.put("username", cfg.get("UserName"));
    header.put("password", cfg.get("PassWord"));
    header.put("token", cfg.get("Token"));
    header.put("account_type", cfg.get("AccountType"));
    json.put("header", header);
    if(body != null) json.put("body", body);
    return Util.JsonEncode(json);
  }

  /* 返回结果 */
  private static String result(JSONObject res) {
    JSONArray data = res.getJSONObject("body").getJSONArray("data");
    if(data.size()>0 && ((JSONObject) data.get(0)).containsKey("result")){
      return ((JSONObject) data.get(0)).get("result").toString();
    }
    return data.toString();
  }

  /* 站点列表 */
  public static String SiteList() {
    String dataStr = GetData();
    JSONObject res = Curl.Request(Url+"ReportService/getSiteList", dataStr, "POST");
    return result(res);
  }

  /* 网站概况-趋势数据 */
  public static String TrendRpt(HashMap<String, Object> params) {
    // 参数
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("method", "overview/getTimeTrendRpt");
    param.put("site_id", "");             //应用ID
    param.put("start_date", "");          //开始日期
    param.put("end_date", "");            //结束日期
    param.put("metrics", "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count");
    param = Util.ArrayMerge(param, params);
    // 请求
    String dataStr = GetData(param);
    JSONObject res = Curl.Request(Url+"ReportService/getData", dataStr, "POST");
    return result(res);
  }

  /* 趋势分析 */
  public static String Trend(HashMap<String, Object> params) {
    // 参数
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("method", "trend/time/a");
    param.put("site_id", "");             //应用ID
    param.put("start_date", "");          //开始日期
    param.put("end_date", "");            //结束日期
    param.put("metrics", "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio,avg_trans_cost,income");
    param.put("gran", "default");         //时间粒度: default/hour/day/week/month/year
    param.put("source", "all");           //来源: all/through/search,0/link/
    param.put("clientDevice", "all");     //设备: all/pc/mobile
    param.put("area", "all");             //地域: all/china/province,1/province,4,90/other
    param.put("visitor", "all");          //访客: all/new/old
    param = Util.ArrayMerge(param, params);
    // 请求
    String dataStr = GetData(param);
    JSONObject res = Curl.Request(Url+"ReportService/getData", dataStr, "POST");
    return result(res);
  }

}
