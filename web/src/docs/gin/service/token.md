## 引入
```go
import "webmis/service"
```

## 验证
```go
(&service.AdminToken{}).Verify(token string, urlPerm string)
```

## 权限数组
```go
(&service.AdminToken{}).Perm(token string)
```

## 生成Token
```go
(&service.AdminToken{}).Create(data map[string]interface{})
```

## Token数据
```go
(&service.AdminToken{}).Token(token string)
```
