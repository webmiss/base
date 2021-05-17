## 引入
```go
import "webmis/service"
```

## 薄雾算法
```go
(&service.Data{}).Mist(redisName string)
```

## 雪花算法
```go
(&service.Data{}).Snowflake()
```

## 图片地址
```go
(&service.Data{}).Img(img interface{})
```
