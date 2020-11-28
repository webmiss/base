package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;

/* 用户信息表 */
public class UserInfo extends Model {

  public String uid = "0";
  public String utime = "null";
  public String nickname = "";
  public String position = "";
  public String name = "";
  public String gender = "";
  public String birthday = "null";
  public String img = "";
  
  /* 构造函数 */
  public UserInfo() {
    this.setPrimaryKey("uid"); //主键
    this.setSource("user_info"); //数据表
  }

  /* 生日 */
  public void setBirthday(String val) throws Exception {
    if(val.equals("")){
      val = "null";
    }
    birthday = val;
  }
  public String getBirthday(){
    return birthday;
  }

  /* 更新 */
  public JSONObject beforeUpdate(JSONObject fields){
    if(fields.get("utime").equals("null")){
      fields.put("utime",Inc.date("yyyy-MM-dd HH:mm:ss"));
    }
    return fields;
  }

}
