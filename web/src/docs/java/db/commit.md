### 事务
```java
import webmis.model.Demo;

Object[] sql;
PreparedStatement ps;
HashMap<String, Object> uData;
Demo model = new Demo();
Connection conn = model.DBConn();
try {
  // 开始
  conn.setAutoCommit(false);
  // SQL1
  Demo m1 = new Demo();
  uData = new HashMap<String, Object>();
  uData.put("id", uid);
  m1.Values(uData);
  sql = m1.InsertSQL();
  ps = m1.Bind(conn, sql[0], sql[1]);
  ps.executeUpdate();
  int id = model.LastInsertId(ps);
  ps.close();
  // SQL2
  Demo m2 = new Demo();
  m2.Where("id=?", uid);
  sql = m2.DeleteSQL();
  ps = m2.Bind(conn, sql[0], sql[1]);
  ps.executeUpdate();
  ps.close();
  // 提交
  conn.commit();
} catch (SQLException e) {
  conn.rollback();
} finally {
  conn.close();
}
```