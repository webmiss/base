## 引入
```go
import "webmis/service"
```

## 返回JSON
```go
(&service.Base{}).GetJSON(c *gin.Context, data interface{})
```

## 输出到控制台
```go
(&service.Base{}).Print(content ...interface{})
```
