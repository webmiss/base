### 更新
```java
import webmis.model.Demo;
// 对象
Demo demo = new Demo();
demo.Set("title");
demo.Where("uid=?");
String sql = demo.UpdateSql();
PreparedStatement ps = demo.Bind(sql);
ps.setString(1, "Java-更新");
ps.setInt(2, id);
int num = demo.Update(ps);
Print(num);
```

### 生成SQL
```java
String sql = db.UpdateSql()
```