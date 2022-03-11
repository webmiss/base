### 插入
```java
import webmis.model.Demo;
// 对象
Demo demo = new Demo();
// 数据
HashMap<String,Object> data = new HashMap<String,Object>();
data.put("uid", 0);
data.put("title", "Java-添加");
demo.Values(data);
// 执行
demo.Insert();
```

### 生成SQL
```java
// sql、args
Object[] sql = db.InsertSQL()
```