## 引入
```go
import "webmis/service"
```

## 访问日志
```go
(&service.Logs{}).Log(data interface{})
```

## 信息日志
```go
(&service.Logs{}).Info(data interface{})
```

## 操作日志
```go
(&service.Logs{}).Action(data interface{})
```

## 错误日志
```go
(&service.Logs{}).Error(data interface{})
```

## 其它
```go
(&service.Logs{}).Writer(text []byte)
```
