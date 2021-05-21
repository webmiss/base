package service

import (
	"fmt"
	"net/http"
	"time"
	"webmis/config"
	"webmis/util"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var Clients map[string]*websocket.Conn
var MsgType int

/* Socket */
type SocketType struct {
	Base
}

/* 路由 */
func router(uid string, conn *websocket.Conn, message []byte) {
	// 数据
	data := make(map[string]interface{})
	util.JsonDecode(string(message), data)
	// 消息
	if data["type"] == "msg" {
		getMsg(uid, conn, data)
	} else {
		send(conn, gin.H{"code": 0, "type": "", "msg": "成功"})
	}
}

/* 消息 */
func getMsg(uid string, conn *websocket.Conn, msg map[string]interface{}) {
	fmt.Println(uid, msg)
	// 群发
	if uid == "0" {
		sendAll(msg)
		return
	}
	// 单发
	send(conn, gin.H{
		"code": 0,
		"type": "msg",
		"msg":  "成功",
		"time": time.Now().Format("2006-01-02 15:04:05"),
	})
}

/* 群发 */
func sendAll(data map[string]interface{}) {
	for _, conn := range Clients {
		send(conn, data)
	}
}

/* 单发 */
func send(conn *websocket.Conn, data map[string]interface{}) {
	res := util.JsonEncode(data)
	if err := conn.WriteMessage(MsgType, res); err != nil {
		fmt.Println("[Socket] send:", err)
	}
}

/* 启动 */
func (SocketType) Socket(c *gin.Context) {
	if Clients == nil {
		Clients = map[string]*websocket.Conn{}
	}
	// 参数
	tp := c.Query("type")
	token := c.Query("token")
	conn, err := (&websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}).Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer conn.Close()
	// 连接
	uid := verify(tp, token)
	if uid == "" {
		return
	}
	Clients[uid] = conn
	for {
		mt, msg, err := conn.ReadMessage()
		MsgType = mt
		// 断开连接
		if v := verify(tp, token); v == "" || err != nil {
			for k, v := range Clients {
				if v == conn {
					delete(Clients, k)
					break
				}
			}
			break
		}
		// 路由
		router(uid, conn, msg)
	}
}

/* 验证 */
func verify(tp string, token string) string {
	if tp == "" || token == "" {
		return ""
	}
	if token == config.Env().Key {
		return "0"
	} else if tp == "api" {
		tData := (&ApiToken{}).Token(token)
		if tData == nil {
			return ""
		}
		return (&util.Type{}).Strval(tData["uid"])
	} else if tp == "admin" {
		tData := (&AdminToken{}).Token(token)
		if tData == nil {
			return ""
		}
		return (&util.Type{}).Strval(tData["uid"])
	}
	return ""
}
