package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;

/* 用户表 */
public class User extends Model {

  public String id = "0";
  public String uname = "";
  public String tel = "";
  public String email = "";
  public String password = "";
  public String rtime = "null";
  public String ltime = "null";
  public String utime = "null";
  public String state = "1";

  /* 构造函数 */
  public User() {
    this.setSource("user"); //数据表
  }

  /* 创建 */
  public JSONObject beforeCreate(JSONObject fields){
    if(fields.get("rtime").equals("null")){
      fields.put("rtime",Inc.date("yyyy-MM-dd HH:mm:ss"));
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
