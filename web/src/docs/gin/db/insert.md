### 插入
```go
import "webmis/model"

type Index struct {
	base.Base
}
func (self *Index) Index(c *gin.Context) {
  demo := (&model.Demo{}).Init()
  demo.Values(map[string]interface{}{
    "uid":   nil,
    "title": "Go-添加",
  })
  id := demo.Insert()
  self.Print(id)
  // 关闭
  demo.Close()
  // 返回
  self.GetJSON(c, gin.H{"code": 0, "msg": "Web", "data": data})
}
```

### 获取SQL
```go
db.InsertSql()
```