### 连表
```java
import webmis.model.Demo;
// 对象
Demo demo = new Demo();
demo.Table("test1 as a");
demo.LeftJoin("test2 as b", "a.id=b.uid");
demo.Columns("a.title", "b.name");
String sql = demo.SelectSQL();
Print(sql);
```

### 其他
```java
// INNER JOIN 
demo.Join()
// LEFT JOIN
demo.LeftJoin()
// RIGHT JOIN
demo.RightJoin()
// FULL JOIN
demo.FullJoin()
```