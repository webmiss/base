## 引入
```go
import "webmis/util"
```

## 执行Linux命令
```go
util.Exec(cmd string)
```

## 字符串长度
```go
util.Len(val string)
```

## 是否为空
```go
util.Empty(val interface{})
```

## 是否存在KEY
```go
util.InKey(name string, data map[string]interface{})
```

## 是否存在于数组
```go
util.InArray(needle string, haystack []string)
```

## 三元表达式
```go
util.If(val bool, tVal interface{}, fVal interface{})
```

## 格式化时间
```go
util.Date(format string, timestamp ...interface{})
util.DateFormat(
  format string,    //格式: yyyy-MM-dd HH:mm:ss
  duration string,  //-1d: 年(y)、月(m)、日(d)、时，分、秒(5h30m40s)
)
```

## 时间戳
```go
util.Time()
```

## 日期转时间戳
```go
util.Strtotime(day string, format string)
```

## Gmt时间格式
```go
util.GmtISO8601(timestamp int64)
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

## Json转换
```go
// 编码
util.JsonEncode(arr interface{})
// 解码
util.JsonDecode(str interface{}, res interface{})
```

## 合并数组
```go
util.ArrayMerge(arrays ...map[string]interface{})
```

## 截取小数位数
```go
// 四舍五入
util.FloatRound(f float64, n int)
// 不四舍五入
util.FloatFloor(f float64, n int)
```