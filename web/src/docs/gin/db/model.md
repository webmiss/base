### 创建模型
**model/demo.go**
```go
package model

type Demo struct {
	Model
}

/* 构造函数 */
func (db *Demo) Init() *Demo {
	db.Table("test")
	return db
}
```

### 使用
```go
import "webmis/model"
demo := (&models.Demo{}).Init()
```
