### 更新
```java
import webmis.model.Demo;

Demo demo = new Demo();
demo.Set("title");
demo.Where("uid=?");
String sql = demo.UpdateSql();
PreparedStatement ps = !sql.equals("")?demo.Bind("update", sql):null;
if(ps != null){
  ps.setString(1, "Java-更新");
  ps.setInt(2, id);
  int num = demo.Update(ps);
  Print(num);
}
// 关闭
demo.Close();
```

### 生成SQL
```java
String sql = db.UpdateSql()
```