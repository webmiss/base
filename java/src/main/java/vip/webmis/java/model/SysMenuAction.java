package vip.webmis.java.model;

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

}
