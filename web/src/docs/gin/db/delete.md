### 删除
```go
import "webmis/model"
// 对象
demo := (&model.Demo{}).New()
demo.Where("uid=?", id)
demo.Delete()
```

### 生成SQL
```go
sql,args := db.DeleteSQL()
```