package vip.webmis.java.model;

import vip.webmis.java.library.Safety;

/* 系统菜单表 */
public class SysMenuAction extends Model {

  public int id = 0;
  public String name = "";
  public String action = "";
  public int perm = 0;
  public String ico = "";
  
  /* 构造函数 */
  public SysMenuAction() {
    this.setSource("sys_menus_action"); //数据表
  }

  /* 名称 */
  public void setName(String val) throws Exception {
    int num = val.length();
    if(num<2 || num>6){
      error("名称为2~6位字符!");
    }
    name = val;
  }
  public String getName(){
    return name;
  }

  /* 命名 */
  public void setAction(String val) throws Exception {
    if(!Safety.test("^[a-zA-Z]{2,16}$",val)){
      error("命名为2~16位英文!");
    }
    action = val;
  }
  public String getAction(){
    return action;
  }

  /* 权限 */
  public void setPerm(Integer val) throws Exception {
    if(val<2 || val%2!=0){
      error("权限为2的n次方!");
    }
    perm = val;
  }
  public int getPerm(){
    return perm;
  }

}
