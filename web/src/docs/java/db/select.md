### 执行SQL
```java
@RequestMapping("")
String index() throws SQLException{
  // 查询
  Demo demo = new Demo();
  demo.Columns("uid", "title");
  demo.Where("title LIKE ?");
  String sql = demo.SelectSql();
  // 参数
  PreparedStatement pst = demo.Bind(sql);
  pst.setString(1, "%事务%");
  // 数据
  ResultSet rs = demo.Query(pst);
  ArrayList<HashMap<String,Object>> data = new ArrayList<HashMap<String,Object>>();
  HashMap<String,Object> tmp;
  while (rs.next()) {
    tmp = new HashMap<String,Object>();
    tmp.put("uid", rs.getInt(1));
    tmp.put("title", rs.getString(2));
    data.add(tmp);
  }
  // 关闭
  demo.Close();
  // 返回数据
  HashMap<String,Object> res = new HashMap<String,Object>();
  res.put("code",0);
  res.put("msg","Web");
  res.put("data",data);
  return getJSON(res);
}
```

### 多条
```java
demo.Find(pst);
```

### 单条
```java
demo.FindFirst(pst);
```

### 获取SQL
```java
demo.SelectSql();
```