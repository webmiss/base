package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;

/* 用户信息表 */
public class UserInfo extends Model {

  public String uid = "0";
  public String nickname = "";
  public String position = "";
  public String name = "";
  public String gender = "";
  public String birthday = "";
  public String img = "";
  public String ctime = "null";
  public String utime = "null";

  /* 构造函数 */
  public UserInfo() {
    this.setPrimaryKey("uid"); //主键
    this.setSource("user_info"); //数据表
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
