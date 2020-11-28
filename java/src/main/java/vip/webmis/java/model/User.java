package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;
import vip.webmis.java.library.Safety;

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

  /* 用户名 */
  public void setUname(String val) throws Exception {
    if(!val.equals("")){
      if(!Safety.isRight("uname",val)) error("用户名英文开头4～16位!");
    }
    uname = val;
  }
  public String getUname(){
    return uname;
  }

  /* 手机 */
  public void setTel(String val) throws Exception {
    if(!val.equals("")){
      if(!Safety.isRight("tel",val)) error("手机号码有误!");
    }
    tel = val;
  }
  public String getTel(){
    return tel;
  }

  /* 邮箱 */
  public void setEmail(String val) throws Exception {
    if(!val.equals("")){
      if(!Safety.isRight("email",val)) error("邮箱有误!");
    }
    email = val;
  }
  public String getEmail(){
    return email;
  }

  /* 密码 */
  public void setPassword(String val) throws Exception {
    if(val.equals("")){
      val = Inc.md5("123456");
    }
    password = val;
  }
  public String getPassword(){
    return password;
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
