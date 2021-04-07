## 引入
```go
import "webmis/library"
```

## 生成
```go
(&library.Qrcode{}).Create(map[string]interface{}{
  "text": "",  //内容
	"size": 200, //大小
})
```

## 识别
```go
(&library.Qrcode{}).Scan("public/upload/qrcode/demo.png")
```