package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;

/* 系统菜单表 */
public class SysMenu extends Model {

  public int id = 0;
  public int fid = 0;
  public String title = "";
  public String url = "";
  public int perm = 0;
  public String ico = "";
  public String ctime = "null";
  public String utime = "null";
  public int sort = 0;
  public String remark = "";
  
  /* 构造函数 */
  public SysMenu() {
    this.setSource("sys_menus"); //数据表
  }

  /* 创建 */
  public JSONObject beforeCreate(JSONObject fields){
    if(fields.get("ctime").equals("null")){
      fields.put("ctime",Inc.date("yyyy-MM-dd HH:mm:ss"));
    }
    return fields;
  }

  /* 更新 */
  public JSONObject beforeUpdate(JSONObject fields){
    if(fields.get("utime").equals("null")){
      fields.put("utime",Inc.date("yyyy-MM-dd HH:mm:ss"));
    }
    return fields;
  }

}
