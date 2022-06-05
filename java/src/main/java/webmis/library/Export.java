package webmis.library;

import java.util.ArrayList;
import java.util.HashMap;

import webmis.service.Base;
import webmis.util.Util;

/* 导出 */
@SuppressWarnings("unchecked")
public class Export extends Base {

  /* Excel内容 */
  static public String Excel(ArrayList<ArrayList<Object>> data){
    HashMap<String, Object> params = new HashMap<String, Object>();
    return Excel(data, params);
  }
  static public String Excel(ArrayList<ArrayList<Object>> data, HashMap<String, Object> params){
    // 参数
    HashMap<String, Object> param = new HashMap<String, Object>();
    param.put("borderColor", "#E2E4E8");      //边框颜色
    param.put("titleColor", "#666");          //标题颜色
    param.put("titleBgColor", "#F2F2F2");     //标题背景
    param = Util.ArrayMerge(param, params);
    // 内容
    String html = "<html>";
    html += "<style type=\"text/css\">";
    html += "table td{height: 32px; border: "+param.get("borderColor")+" 1px solid;}";
    html += ".title{background-color: "+param.get("titleBgColor")+"; color: "+param.get("titleColor")+"; font-weight: bold;}";
    html += "</style>";
    html += "<table>";
    int i=0;
    for(ArrayList<Object> v1 : data){
      html += "<tr>";
      for(Object v2 : v1){
        html += i==0?"<td class=\"title\">"+v2+"</td>":"<td>"+v2+"</td>";
      }
      html += "</tr>";
      i++;
    }
    html += "</table>";
    html += "</html>";
    return html;
  }
  
}
