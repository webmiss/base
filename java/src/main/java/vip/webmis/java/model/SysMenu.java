package vip.webmis.java.model;

import com.alibaba.fastjson.JSONObject;

import vip.webmis.java.common.Inc;
import vip.webmis.java.library.Safety;

/* 系统菜单表 */
public class SysMenu extends Model {

  public int id = 0;
  public String fid = "0";
  public String title = "";
  public String url = "";
  public String perm = "0";
  public String ico = "";
  public String ctime = "null";
  public String utime = "null";
  public String sort = "0";
  public String remark = "";
  
  /* 构造函数 */
  public SysMenu() {
    this.setSource("sys_menus"); //数据表
  }

  /* FID */
  public void setFid(String val) throws Exception {
    System.out.println();
    if(!Inc.is_numeric(val)){
      error("FID为正整数!");
    }
    fid = String.valueOf(Integer.parseInt(val));
  }
  public String getFid(){
    return fid;
  }

  /* 名称 */
  public void setTitle(String val) throws Exception {
    int num = val.length();
    if(num<2 || num>8){
      error("名称为2~8位字符!");
    }
    title = val;
  }
  public String getTitle(){
    return title;
  }

  /* 控制器 */
  public void setUrl(String val) throws Exception {
    if(!Safety.test("^[a-zA-Z]{2,24}$",val)){
      error("控制器为2~24位英文!");
    }
    url = val;
  }
  public String getUrl(){
    return url;
  }

  /* 预设权限 */
  public void setPerm(String val) throws Exception {
    System.out.println();
    if(!Inc.is_numeric(val)){
      error("权限值为正整数!");
    }
    perm = String.valueOf(Integer.parseInt(val));
  }
  public String getPerm(){
    return perm;
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
