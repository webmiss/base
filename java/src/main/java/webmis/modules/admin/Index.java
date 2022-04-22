package webmis.modules.admin;

import java.util.ArrayList;
import java.util.HashMap;

import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webmis.service.AdminToken;
import webmis.service.Base;
import webmis.service.Data;
import webmis.model.SysConfig;

@RestController
@Controller("AdminIndex")
@RequestMapping("/admin")
public class Index extends Base {

  /* 首页 */
  @RequestMapping("")
  String index(){
    HashMap<String,Object> res;
    // 返回
    res = new HashMap<String,Object>();
    res.put("code",0);
    res.put("msg","Admin");
    return GetJSON(res);
  }

  /* 系统配置 */
  @RequestMapping("index/getConfig")
  String GetConfig(){
    // 查询
    SysConfig config = new SysConfig();
    config.Columns("name","val");
    config.Where("name in ('title','copy','logo','login_bg')");
    ArrayList<HashMap<String, Object>> data = config.Find();
    // 数据
    HashMap<String,Object> list = new HashMap<String,Object>();
    for(HashMap<String, Object> val : data){
      if(val.get("name").equals("logo") || val.get("name").equals("login_bg")){
        list.put(val.get("name").toString(), Data.Img(val.get("val")));
      } else {
        list.put(val.get("name").toString(), val.get("val"));
      }
    }
    // 返回
    HashMap<String,Object> res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("list", list);
    return GetJSON(res);
  }

  /* 图表数据 */
  @RequestMapping("index/getChart")
  String GetChart(@RequestBody JSONObject json){
    HashMap<String,Object> res;
    HashMap<String,Object> data = new HashMap<String,Object>();
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

    // 今日流量
    HashMap<String,Object> arr1 = new HashMap<String,Object>();
    HashMap<String,Object> tmp1;
    // 今日
    tmp1 = new HashMap<String,Object>();
    tmp1.put("day", 0);
    tmp1.put("pv", 0);
    tmp1.put("uv", 0);
    tmp1.put("ip", 0);
    tmp1.put("ratio", 0);
    tmp1.put("time", 0);
    arr1.put("today", tmp1);
    data.put("TrendRpt", arr1);
    // 昨日
    tmp1 = new HashMap<String,Object>();
    tmp1.put("day", 0);
    tmp1.put("pv", 0);
    tmp1.put("uv", 0);
    tmp1.put("ip", 0);
    tmp1.put("ratio", 0);
    tmp1.put("time", 0);
    arr1.put("yesterday", tmp1);
    data.put("TrendRpt", arr1);

    // 趋势分析
    ArrayList<HashMap<String,Object>> arr2 = new ArrayList<HashMap<String,Object>>();
    HashMap<String,Object> tmp2;
    tmp2 = new HashMap<String,Object>();
    tmp2.put("type", "浏览量(PV)");
    tmp2.put("label", "1月");
    tmp2.put("value", 0);
    arr2.add(tmp2);
    tmp2 = new HashMap<String,Object>();
    tmp2.put("type", "访客数(UV)");
    tmp2.put("label", "1月");
    tmp2.put("value", 1);
    arr2.add(tmp2);
    tmp2 = new HashMap<String,Object>();
    tmp2.put("type", "IP数");
    tmp2.put("label", "1月");
    tmp2.put("value", 2);
    arr2.add(tmp2);
    data.put("Trend", arr2);

    // 返回
    res = new HashMap<String,Object>();
    res.put("code", 0);
    res.put("msg", "成功");
    res.put("data", data);
    return GetJSON(res);

    // // 统计图1
    // ArrayList<HashMap<String,Object>> chart1 = new ArrayList<HashMap<String,Object>>();
    // String day = Util.Date("yyyy-MM-dd");
    // last1 = Util.DateFormat("yyyy-MM-dd", Calendar.DAY_OF_MONTH, 1);
    // last2 = Util.DateFormat("yyyy-MM-dd", Calendar.DAY_OF_MONTH, -1);
    // for(int i=0; i<24; i++) {
    //   if(i==23) {
    //     dt1 = day + " " + String.valueOf(i) + ":00:00";
    //     dt2 = last1 + " 00:00:00";
    //     dt3 = last2 + " " + String.valueOf(i) + ":00:00";
    //     dt4 = day + " 00:00:00";
    //   } else {
    //     dt1 = day + " " + String.valueOf(i) + ":00:00";
    //     dt2 = day + " " + String.valueOf(i+1) + ":00:00";
    //     dt3 = last2 + " " + String.valueOf(i) + ":00:00";
    //     dt4 = last2 + " " + String.valueOf(i+1) + ":00:00";
    //   }
    //   t1 = Util.Strtotime(dt1);
    //   t2 = Util.Strtotime(dt2);
    //   t3 = Util.Strtotime(dt3);
    //   t4 = Util.Strtotime(dt4);
    //   // 统计
    //   m1 = new Logs();
    //   m1.Columns("count(*) as total");
    //   m1.Where("ctime>=? AND ctime<? AND source=?", t1, t2, Env.log_source);
    //   HashMap<String, Object> d1 = m1.FindFirst();
    //   res = new HashMap<String,Object>();
    //   res.put("type", "今日(PV)");
    //   res.put("label", String.valueOf(i));
    //   res.put("value", Type.Int(d1.get("total")));
    //   chart1.add(res);
    //   m2 = new Logs();
    //   m2.Columns("count(*) as total");
    //   m2.Where("ctime>=? AND ctime<? AND source=?", t3, t4, Env.log_source);
    //   HashMap<String, Object> d2 = m2.FindFirst();
    //   res = new HashMap<String,Object>();
    //   res.put("type", "昨日(PV)");
    //   res.put("label", String.valueOf(i));
    //   res.put("value", Type.Int(d2.get("total")));
    //   chart1.add(res);
    // }
    // // 统计图2
    // ArrayList<HashMap<String,Object>> chart2 = new ArrayList<HashMap<String,Object>>();
    // String year = Util.Date("yyyy");
    // last1 = String.valueOf(Integer.valueOf(year)+1);
    // last2 = String.valueOf(Integer.valueOf(year)-1);
    // for(int i=0; i<12; i++) {
    //   if(i==11) {
    //     dt1 = year + "-" + String.valueOf(i+1) + "-01";
    //     dt2 = last1 + "-01-01";
    //     dt3 = last2 + "-" + String.valueOf(i+1) + "-01";
    //     dt4 = year + "-01-01";
    //   } else {
    //     dt1 = year + "-" + String.valueOf(i+1) + "-01";
    //     dt2 = year + "-" + String.valueOf(i+2) + "-01";
    //     dt3 = last2 + "-" + String.valueOf(i+1) + "-01";
    //     dt4 = last2 + "-" + String.valueOf(i+2) + "-01";
    //   }
    //   t1 = Util.Strtotime(dt1, "yyyy-MM-dd");
    //   t2 = Util.Strtotime(dt2, "yyyy-MM-dd");
    //   t3 = Util.Strtotime(dt3, "yyyy-MM-dd");
    //   t4 = Util.Strtotime(dt4, "yyyy-MM-dd");
    //   // 统计
    //   m1 = new Logs();
    //   m1.Columns("count(*) as total");
    //   m1.Where("ctime>=? AND ctime<? AND source=?", t1, t2, Env.log_source);
    //   HashMap<String, Object> d1 = m1.FindFirst();
    //   res = new HashMap<String,Object>();
    //   res.put("type", "今年(PV)");
    //   res.put("label", String.valueOf(i+1));
    //   res.put("value", Type.Int(d1.get("total")));
    //   chart2.add(res);
    //   m2 = new Logs();
    //   m2.Columns("count(*) as total");
    //   m2.Where("ctime>=? AND ctime<? AND source=?", t3, t4, Env.log_source);
    //   HashMap<String, Object> d2 = m2.FindFirst();
    //   res = new HashMap<String,Object>();
    //   res.put("type", last2+"年(PV)");
    //   res.put("label", String.valueOf(i+1));
    //   res.put("value", Type.Int(d2.get("total")));
    //   chart2.add(res);
    // }
    // // 统计图3
    // ArrayList<HashMap<String,Object>> chart3 = new ArrayList<HashMap<String,Object>>();
    // m1 = new Logs();
    // m1.Columns("count(*) as total");
    // m1.Where("source=?", Env.log_source);
    // HashMap<String, Object> d1 = m1.FindFirst();
    // m2 = new Logs();
    // m2.Columns("count(*) as total", "browser");
    // m2.Where("source=?", Env.log_source);
    // m2.Group("browser");
    // ArrayList<HashMap<String, Object>> d2 = m2.Find();
    // for(HashMap<String, Object> val : d2) {
    //   float ratio = (float)Math.round((float)Type.Int(val.get("total"))/Type.Int(d1.get("total"))*100)/100;
    //   res = new HashMap<String,Object>();
    //   res.put("label", val.get("browser"));
    //   res.put("value", ratio);
    //   chart3.add(res);
    // }
    // // 返回
    // res = new HashMap<String,Object>();
    // res.put("code", 0);
    // res.put("msg", "成功");
    // res.put("chart1", chart1);
    // res.put("chart2", chart2);
    // res.put("chart3", chart3);
    // return GetJSON(res);
  }

}
