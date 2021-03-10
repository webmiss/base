### 删除
```java
import webmis.model.Demo;

Demo demo = new Demo();
demo.Where("uid=?");
String sql = demo.DeleteSql();
PreparedStatement ps = demo.Bind(sql);
ps.setInt(1, id);
int num = demo.Delete(ps);
Print(num);
// 关闭
demo.Close();
```

### 生成SQL
```java
String sql = db.DeleteSql()
```