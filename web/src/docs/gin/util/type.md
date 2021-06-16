## 引入
```go
import "webmis/util"
```

## Bool
```go
(&util.Type{}).Bool(val interface{})
```

## Int
```go
(&util.Type{}).Int(val interface{})
```

## Int64
```go
(&util.Type{}).Int64(val interface{})
```

## Float
```go
(&util.Type{}).Float(val interface{})
```

## Float64
```go
(&util.Type{}).Float64(val interface{})
```

## Uint64
```go
(&util.Type{}).Uint64(val interface{})
```

## 转换
```go
(&util.Type{}).ToType(tp string, val interface{})
```
- tp: string、int、int64、float、float64、uint64

## Strval
```go
(&util.Type{}).Strval(val interface{})
```

## 获取类型
```go
(&util.Type{}).GetType(val interface{})
```
