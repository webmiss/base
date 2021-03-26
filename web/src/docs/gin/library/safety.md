## 引入
```go
import "webmis/library"
```

## 正则-公共
```go
(&library.Safety{}).IsRight(
  name string,  //uname,passwd,tel,email,idcard
  val string    //内容
)
```

## 正则-验证
```go
(&library.Safety{}).Test(
  reg string,   //正则: "^1\d{10}$"
  val string    //内容
)
```

## Base64-加密
```go
(&library.Safety{}).Encode(
  param map[string]interface{}  //数据
)
```

## Base64-解密
```go
(&library.Safety{}).Decode(
  token string  //Token
)
```
