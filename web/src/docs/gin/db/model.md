### 创建模型
**model/demo.go**
```go
package model

type Demo struct {
	Model
}

/* 构造函数 */
func (m *Demo) New() *Demo {
	m.Table("test")
	return m
}
```

### 使用
```go
import "webmis/model"
// 对象
demo := (&models.Demo{}).New()
```
