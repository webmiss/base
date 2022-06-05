## 引入
```go
import "webmis/library"
```

## 发送请求
```go
(&library.Curl{}).Request(
  url string,                       //请求地址
  data []byte,                      //请求数据
  method string,                    //请求方式
  header map[string]interface{}     //Headers参数
)
```

## URL参数
```go
// 生成
param := (&library.Curl{}).UrlEncode(map[string]interface{}{
  "id":   1,
  "name": "测试",
})
r.Print(param)
// 解析
data := (&library.Curl{}).UrlDecode(param)
r.Print(data)
```
