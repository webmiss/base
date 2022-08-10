package webmis.modules.admin;

import java.util.HashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.util.Util;
import webmis.library.baidu.TongJi;

@RestController
@Controller("AdminIndex")
@RequestMapping("/admin")
public class Index extends Base {

  private static final String site_id = "17669804";

  /* 首页 */
  @RequestMapping("")
  String index(){
    HashMap<String,Object> res;
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Java Admin");
    return GetJSON(res);
  }

  /* 图表数据 */
  @RequestMapping("index/getChart")
  String GetChart(@RequestBody JSONObject json){
    HashMap<String,Object> res;
    HashMap<String, Object> params;
    HashMap<String,Object> data = new HashMap<String,Object>();
    String sDate;
    String eDate;
    String day = Util.DateFormat("yyyyMMdd");
    // 参数
    String token = JsonName(json, "token");
    // 验证
    String msg = AdminToken.Verify(token, "");
    if(!msg.equals("")){
      res = new HashMap<String,Object>();
      res.put("code", 4001);
      res.put("msg", msg);
      return GetJSON(res);
    }

    /* 今日流量 */
    sDate = Util.DateFormat("yyyyMMdd", "-1d");
    eDate = day;
    params = new HashMap<String, Object>();
    params.put("site_id", site_id);
    params.put("start_date", sDate);
    params.put("end_date", eDate);
    params.put("metrics", "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time");
    String res1 = TongJi.TrendRpt(params);
    JSONObject d1 = JSON.parseObject(res1);
    JSONArray t = d1.getJSONArray("items");
    JSONArray t1 = (JSONArray) ((JSONArray) t.get(1)).get(1);
    JSONArray t2 = (JSONArray) ((JSONArray) t.get(1)).get(0);
    HashMap<String,Object> arr1 = new HashMap<String,Object>();
    HashMap<String,Object> tmp1;
    // 今日
    tmp1 = new HashMap<String,Object>();
    tmp1.put("day", ((JSONArray) ((JSONArray) t.get(0)).get(1)).get(0));
    tmp1.put("pv", !t1.get(0).equals("--")?t1.get(0):"0");
    tmp1.put("uv", !t1.get(1).equals("--")?t1.get(1):"0");
    tmp1.put("ip", !t1.get(2).equals("--")?t1.get(2):"0");
    tmp1.put("ratio", !t1.get(3).equals("--")?t1.get(3):"0");
    tmp1.put("time", !t1.get(4).equals("--")?t1.get(4):"0");
    arr1.put("today", tmp1);
    data.put("TrendRpt", arr1);
    // 昨日
    tmp1 = new HashMap<String,Object>();
    tmp1.put("day", ((JSONArray) ((JSONArray) t.get(0)).get(0)).get(0));
    tmp1.put("pv", !t2.get(0).equals("--")?t2.get(0):"0");
    tmp1.put("uv", !t2.get(1).equals("--")?t2.get(1):"0");
    tmp1.put("ip", !t2.get(2).equals("--")?t2.get(2):"0");
    tmp1.put("ratio", !t2.get(3).equals("--")?t2.get(3):"0");
    tmp1.put("time", !t2.get(4).equals("--")?t2.get(4):"0");
    arr1.put("yesterday", tmp1);
    data.put("TrendRpt", arr1);

    /* 趋势分析 */
    String tp = JsonName(json, "type");
    String gran = "day";
    if(tp.equals("t1")){
      gran = "hour";
      sDate = day;
      eDate = day;
    }else if(tp.equals("t2")){
      gran = "hour";
      sDate = Util.DateFormat("yyyyMMdd", "-1d");
      eDate = sDate;
    }else if(tp.equals("t3")){
      sDate = Util.DateFormat("yyyyMMdd", "-6d");
      eDate = day;
    }else if(tp.equals("t4")){
      sDate = Util.DateFormat("yyyyMMdd", "-29d");
      eDate = day;
    }
    params = new HashMap<String, Object>();
    params.put("site_id", site_id);
    params.put("start_date", sDate);
    params.put("end_date", eDate);
    params.put("metrics", "pv_count,visitor_count,ip_count");
    params.put("gran", gran);
    String res2 = TongJi.Trend(params);
    JSONObject d2 = JSON.parseObject(res2);
    // 数据
    Object label;
    Object value;
    JSONArray trend = new JSONArray();
    JSONObject tmp2;
    int n = d2.getJSONArray("items").getJSONArray(0).size()-1;
    for(int i=n; i>=0; i--){
      if(tp.equals("t1") || tp.equals("t2")){
        label = String.valueOf(n-i) + "点";
      }else{
        label = d2.getJSONArray("items").getJSONArray(0).getJSONArray(i).get(0);
      }
      // 浏览量(PV)
      value = d2.getJSONArray("items").getJSONArray(1).getJSONArray(i).get(0);
      tmp2 = new JSONObject();
      tmp2.put("type", "浏览量(PV)");
      tmp2.put("label", label);
      tmp2.put("value", value.equals("--")?0:value);
      trend.add(tmp2);
      // 访客数(UV)
      value = d2.getJSONArray("items").getJSONArray(1).getJSONArray(i).get(1);
      tmp2 = new JSONObject();
      tmp2.put("type", "访客数(UV)");
      tmp2.put("label", label);
      tmp2.put("value", value.equals("--")?0:value);
      trend.add(tmp2);
      // IP数
      value = d2.getJSONArray("items").getJSONArray(1).getJSONArray(i).get(2);
      tmp2 = new JSONObject();
      tmp2.put("type", "IP数");
      tmp2.put("label", label);
      tmp2.put("value", value.equals("--")?0:value);
      trend.add(tmp2);
    }
    data.put("Trend", trend);

    /* 返回 */
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("data", data);
    return GetJSON(res);
  }

}
