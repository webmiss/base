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

  /* 名称 */
  public void setRole(String val) throws Exception {
    int num = val.length();
    if(num<2 || num>16){
      error("名称为2~16位字符!");
    }
    role = val;
  }
  public String getRole(){
    return role;
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
