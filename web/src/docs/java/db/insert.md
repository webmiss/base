### 插入
```java
import webmis.model.Demo;
// 对象
Demo demo = new Demo();
demo.Values("uid","title");
String sql = demo.InsertSql();
// 参数
PreparedStatement ps = demo.Bind(sql, true);
ps.setNull(1, 0);
ps.setString(2, "Java-添加");
// 执行
int id = demo.Insert(ps);
```

### 生成SQL
```java
String sql = db.InsertSql()
```