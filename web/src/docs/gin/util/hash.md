## 引入
```go
import "webmis/util"
```

## Md5
```go
(&util.Hash{}).Md5(data string)
```

## Sha256
```go
(&util.Hash{}).Sha256(data string)
```

## HmacSha1
```go
(&util.Hash{}).HmacSha1(data string, key []byte)
```

## HmacSha256
```go
(&util.Hash{}).HmacSha256(data string, key []byte)
```

## Byte转为16进制
```go
(&util.Hash{}).HexEncode(bytes []byte)
```
