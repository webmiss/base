### 事务
```java
import webmis.model.Demo;
import webmis.model.Model;

Model model = new Model();
Demo demo = new Demo();
Connection conn = model.Conn();
try {
  // 开始
  conn.setAutoCommit(false);
  // SQL1
  demo.Values("uid","title1");
  String sql = demo.InsertSql();
  PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
  ps.setNull(1, 0);
  ps.setString(2, "Java-事件");
  ps.executeUpdate();
  ResultSet rs = ps.getGeneratedKeys();
  int id = rs.next()?rs.getInt(1):0;
  Print(ps, id);
  // SQL2
  demo.Where("uid=?");
  sql = demo.DeleteSql();
  ps = conn.prepareStatement(sql);
  ps.setInt(1, id);
  int num = ps.executeUpdate();
  Print(ps, num);
  // 提交
  conn.commit();
} catch (SQLException e) {
  conn.rollback();
} finally {
  conn.close();
}
```