### 插入
```java
import webmis.model.Demo;

int id = 0;
Demo demo = new Demo();
demo.Values("uid","title");
String sql = demo.InsertSql();
// 参数
PreparedStatement pst = !sql.equals("")?demo.Bind("insert", sql):null;
if(pst != null){
  pst.setNull(1, 0);
  pst.setString(2, "Java-添加");
  // 执行
  id = demo.Insert(pst);
}
// 关闭
demo.Close();
```

### 生成SQL
```java
String sql = db.InsertSql()
```