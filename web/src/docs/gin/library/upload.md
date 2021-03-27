## 引入
```go
import "webmis/library"
```

## Base64
```go
(&library.Upload{}).Base64(map[string]interface{}{
  "param":    "upload/", //上传目录
  "base64":   "",        //文件内容
  "filename": "",        //文件名
  "ext":      "png",     //后缀
})
```