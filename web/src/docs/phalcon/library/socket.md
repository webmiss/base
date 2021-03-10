## 安装
```bash
go get -u github.com/gorilla/websocket
```

## 服务器
```bash
# 运行
./shell socket
# 启动
./shell socketStart
```

### service/msg.go
```go
package service

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Msgs struct {
}

/* 路由 */
func (m Msgs) Router(conn *websocket.Conn, mt int, message []byte) {
	// 数据
	msg := make(map[string]interface{})
	_ = json.Unmarshal(message, &msg)
	// 消息
	if msg["type"] == "msg" {
		Msg(conn, mt, msg)
	} else {
		res, _ := json.Marshal(gin.H{"type": "", "code": 0, "msg": "成功"})
		conn.WriteMessage(mt, res)
	}
}

/* 消息 */
func Msg(conn *websocket.Conn, mt int, msg map[string]interface{}) {
	fmt.Println(msg)
	res, _ := json.Marshal(gin.H{
		"type": "msg",
		"code": 0,
		"msg":  "成功",
		"time": time.Now().Format("2006-01-02 15:04:05"),
	})
	conn.WriteMessage(mt, res)
}
```
