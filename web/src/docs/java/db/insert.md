### 插入
```java
import webmis.model.Demo;

Demo demo = new Demo();
demo.Values("uid","title");
String sql = demo.InsertSql();
// 参数
PreparedStatement ps = !sql.equals("")?demo.Bind("insert", sql):null;
if(ps != null){
  ps.setNull(1, 0);
  ps.setString(2, "Java-添加");
  // 执行
  int id = demo.Insert(ps);
}
// 关闭
demo.Close();
```

### 生成SQL
```java
String sql = db.InsertSql()
```