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
model := (&models.Demo{}).New()
```

### 连接
```go
model.DBConn()
```

### 查询
```go
model.Query(conn *sql.DB, sql string, args []interface{})
```

### 执行
```go
model.Exec(conn *sql.DB, sql string, args []interface{})
```
