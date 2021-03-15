package webmis.library;

import org.casbin.jcasbin.main.Enforcer;
import webmis.base.Base;

/* 权限控制 */
public class Casbin extends Base {

  public static Enforcer CasBinDB;    //连接

  /* 连接 */
  public void CasBinPool() {
    try {
      CasBinDB = new Enforcer("config/casbin.conf", "config/casbin.csv");
    } catch (Exception e) {
      Print("[Casbin] Conn:", e.getMessage());
    }
  }

  /* 验证 */
  public boolean Verify(String sub, String obj, String act) {
    if(CasBinDB==null) return false;
    return CasBinDB.enforce(sub, obj, act);
  }

  /* 添加 */
  public void Add(String sub, String obj, String act) {
    Print("conn", CasBinDB);
    if(CasBinDB==null) return ;
    boolean res = CasBinDB.addPolicy(sub, obj, act);
    Print(res);
    try {
      CasBinDB.savePolicy();
    } catch (Exception e) {
      Print("[Casbin] Add:", e.getMessage());
    }
    // if(CasBinDB.addPolicy(sub, obj, act)) CasBinDB.savePolicy();
    // CasBinDB.savePolicy();
  }

  /* 删除 */
  public void Remove(String sub, String obj, String act) {
    if(CasBinDB==null) return ;
    CasBinDB.removePolicy(sub, obj, act);
    CasBinDB.savePolicy();
  }
  
}
