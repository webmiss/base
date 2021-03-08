### 更新
```java
int num;
demo.Set("title");
demo.Where("uid=?");
String sql = demo.UpdateSql();
PreparedStatement pst = !sql.equals("")?demo.Bind("update", sql):null;
if(pst != null){
  pst.setString(1, "Java-更新");
  pst.setInt(2, id);
  num = demo.Update(pst);
  Print(num);
}
// 关闭
demo.Close();
```

### 生成SQL
```java
String sql = db.UpdateSql()
```