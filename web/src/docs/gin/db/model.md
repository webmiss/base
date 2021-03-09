### 创建模型
**model/demo.go**
```go
package model

type Demo struct {
	Model
}

/* 构造函数 */
func (self *Demo) Init() *Demo {
	self.Db("")
	self.Table("test")
	return self
}
```

### 使用
```go
import "webmis/model"
demo := (&models.Demo{}).Init()
```
