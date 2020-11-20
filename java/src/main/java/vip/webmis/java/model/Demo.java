package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;

/* 用户信息表 */
public class Demo extends Model {

  public int uid = 0;
  public String title = "";
  public String ctime = "null";
  public String utime = "null";

  /* 构造函数 */
  public Demo() {
    this.setPrimaryKey("uid"); //主键
    this.setSource("test"); //数据表
  }

  /* 标题 */
  public void setTitle(String val){
    title = val;
  }
  public String getTitle(){
    return title;
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

  /* 删除 */
  public void beforeDelete(){ }
  
}
