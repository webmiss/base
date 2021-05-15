## 引入
```go
import "webmis/util"
```

## 是否为空
```go
util.Empty(val interface{})
```

## 是否KEY
```go
util.InKey(name string, data map[string]interface{})
```

## 三元表达式
```go
util.If(val bool, tVal interface{}, fVal interface{})
```

## 格式化时间
```go
util.Date(format string, timestamp ...interface{})
```

## 时间戳
```go
util.Time()
```

## 日期转时间戳
```go
util.Strtotime(day string, format string)
```

## 去首尾空格
```go
util.Trim(str interface{}, charlist ...string)
```

## 拆分字符串为数组
```go
util.Explode(delimiter string, str string)
```

## 数组合成字符串
```go
util.Implode(glue string, pieces []string)
```

## JSON转字符串
```go
util.JsonEncode(arr interface{})
```

## JSON字符串转数组
```go
util.JsonDecode(str interface{}, res interface{})
```

## 合并数组
```go
util.ArrayMerge(arrays ...map[string]interface{})
```

## 是否存在于数组
```go
util.InArray(needle string, haystack []string)
```
