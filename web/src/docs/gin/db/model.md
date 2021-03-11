### 创建模型
**model/demo.go**
```go
package model

type Demo struct {
	Model
}

/* 构造函数 */
func (self *Demo) New() *Demo {
	self.Db("")
	self.Table("test")
	self.Run()
	return self
}
```

### 使用
```go
import "webmis/model"
demo := (&models.Demo{}).Init()
```
