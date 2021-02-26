### 创建模型
**app/model/demo.go**
```go
package model

type Demo struct {
	Model
}

/* 初始化 */
func (db *Demo) Init() *Demo {
	db.Table("test")
	return db
}

```

### 使用
```go
demo := (&models.Demo{}).Init()
```
