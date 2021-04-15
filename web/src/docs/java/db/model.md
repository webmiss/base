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
Demo demo = new Demo();
```
