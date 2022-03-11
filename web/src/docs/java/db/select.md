### 查询
```java
@RequestMapping("")
String index() {
  ArrayList<HashMap<String,Object>> data = null;
  // 查询
  Demo model = new Demo();
  model.Columns("uid", "title");
  model.Where("title LIKE ?", "%查询%");
  data = model.Find();
  // 返回数据
  HashMap<String,Object> res = new HashMap<String,Object>();
  res.put("code",0);
  res.put("msg","Web");
  res.put("data",data);
  return GetJSON(res);
}
```

### 多条
```java
demo.Find();
```

### 单条
```java
demo.FindFirst();
```

### 返回类型
```java
demo.ResType();
```

### 生成SQL
```java
// sql、args
Object[] sql = demo.SelectSQL();
```