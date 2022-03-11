### 更新
```java
import webmis.model.Demo;
// 对象
Demo demo = new Demo();
// 数据
HashMap<String,Object> data = new HashMap<String,Object>();
data.put("title", "Java-更新");
demo.Set(data);
demo.Where("uid=?", id);
// 执行
demo.Update();
```

### 生成SQL
```java
// sql、args
Object[] sql = db.UpdateSQL()
```