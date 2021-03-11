### 更新
```go
import "webmis/model"
// 对象
demo := (&model.Demo{}).New()
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