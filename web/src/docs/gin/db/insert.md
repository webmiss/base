### 插入
```go
import "webmis/model"
// 对象
demo := (&model.Demo{}).New()
demo.Values(map[string]interface{}{
  "uid":   nil,
  "title": "Go-添加",
})
demo.Insert()
```

### 生成SQL
```go
sql,args := db.InsertSQL()
```