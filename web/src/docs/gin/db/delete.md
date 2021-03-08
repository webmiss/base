### 删除
```go
demo := (&model.Demo{}).Init()
demo.Where("uid=?", id)
num := demo.Delete()
self.Print(num)
// 关闭
demo.Close()
```

### 生成SQL
```go
sql,args := db.DeleteSql()
```