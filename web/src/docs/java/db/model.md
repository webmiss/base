### 创建模型
**model/Demo.java**
```java
package webmis.model;

public class Demo extends Model {

  /* 构造函数 */
  public Demo() {
    this.Table("test");
  }
  
}
```

### 使用
```java
import webmis.model.Demo;
// 对象
Demo model = new Demo();
```

### 连接
```java
model.DBConn()
```

### 生成SQL
```java
PreparedStatement ps = model.Bind(Connection conn, Object sql, Object args)
```

### 查询
```java
model.Query(PreparedStatement ps)
```

### 执行
```java
model.Exec(PreparedStatement ps)
```
