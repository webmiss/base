### 创建模型
**model/Demo.java**
```java
package webmis.model;

public class Demo extends Model {

  /* 构造函数 */
  public Demo() {
    this.Db("");
    this.Table("test");
  }
  
}
```

### 使用
```java
import webmis.model.Demo;
Demo demo = new Demo();
```
