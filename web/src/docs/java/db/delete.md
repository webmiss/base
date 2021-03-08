### 删除
```java
int num;
demo.Where("uid=?");
String sql = demo.DeleteSql();
PreparedStatement pst = !sql.equals("")?demo.Bind("delete", sql):null;
if(pst != null){
  pst.setInt(1, id);
  num = demo.Delete(pst);
  Print(num);
}
// 关闭
demo.Close();
```

### 生成SQL
```java
String sql = db.DeleteSql()
```