## 服务器
```bash
# 运行
./bash socket
# 启动
./bash socketStart
```
- 数据: service/scoket.go
- 发送: library/scoket.go

## 群发
```go
import "library"

go (&library.Socket{}).Send(
  "admin",
  gin.H{
    "code": 0,
    "type": "msg",
    "data": gin.H{
      "title":   "测试",
      "content": "测试内容",
    },
  },
)
```
