### 更新
```go
demo := (&model.Demo{}).Init()
demo.Set(map[string]interface{}{
  "title": "Go-更新",
})
demo.Where("uid=?", id)
num := demo.Update()
self.Print(num)
// 关闭
demo.Close()
```

### 生成SQL
```go
sql,args := db.UpdateSql()
```