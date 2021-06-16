## 引入
```go
import "webmis/util"
```

## 编码
```go
(&util.Base64{}).Encode(data []byte)
```

## 解码
```go
(&util.Base64{}).Decode(data string)
```

## 编码(URL)
```go
(&util.Base64{}).UrlEncode(data []byte)
```

## 解码(URL)
```go
(&util.Base64{}).UrlDecode(data string)
```

## 压缩
```go
(&util.Base64{}).Compress(data []byte)
```

## 解压
```go
(&util.Base64{}).UnCompress(data []byte)
```
