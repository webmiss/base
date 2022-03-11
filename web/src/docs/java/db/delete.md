### 删除
```java
import webmis.model.Demo;
// 对象
Demo demo = new Demo();
demo.Where("uid=?", id);
demo.Delete();
```

### 生成SQL
```java
// sql、args
Object[] sql = db.DeleteSQL()
```