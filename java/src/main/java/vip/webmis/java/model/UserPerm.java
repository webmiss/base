package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;

/* 权限表 */
public class UserPerm extends Model {

  public String uid = "0";
  public String state_admin = "0";
  public String state_app = "0";
  public String utime = "null";
  public String role = "";
  public String perm = "";
  
  /* 构造函数 */
  public UserPerm() {
    this.setPrimaryKey("uid"); //主键
    this.setSource("user_perm"); //数据表
  }

  /* 更新 */
  public JSONObject beforeUpdate(JSONObject fields){
    if(fields.get("utime").equals("null")){
      fields.put("utime",Inc.date("yyyy-MM-dd HH:mm:ss"));
    }
    return fields;
  }

}
