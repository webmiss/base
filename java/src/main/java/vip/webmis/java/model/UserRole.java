package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;

/* 角色表 */
public class UserRole extends Model {

  public int id = 0;
  public String role = "";
  public String ctime = "null";
  public String utime = "null";
  public String perm = "";

  /* 构造函数 */
  public UserRole() {
    this.setSource("user_role"); //数据表
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
