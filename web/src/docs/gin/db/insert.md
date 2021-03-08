### 插入
```go
demo := (&model.Demo{}).Init()
demo.Values(map[string]interface{}{
  "uid":   nil,
  "title": "Go-添加",
})
id := demo.Insert()
self.Print(id)
// 关闭
demo.Close()
```

### 生成SQL
```go
sql,args := db.InsertSql()
```