package service

import (
	"encoding/json"
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

// Socket :通信
func (s SocketType) Socket(c *gin.Context) {
	if Clients == nil {
		Clients = map[string]*websocket.Conn{}
	}
	// 参数
	tp := c.Query("type")
	token := c.Query("token")
	conn, err := (&websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}).Upgrade(c.Writer, c.Request, nil)
	if tp == "" || token == "" || err != nil {
		return
	}
	defer conn.Close()
	// 验证
	var uid string
	if token == config.Env().Key {
		uid = "0"
	} else if tp == "api" {
		msg := (&ApiToken{}).Verify(token, "")
		if msg != "" {
			return
		}
		tData := (&ApiToken{}).Token(token)
		uid = util.Strval(tData["uid"])
		Clients[uid] = conn
	} else if tp == "admin" {
		msg := (&AdminToken{}).Verify(token, "")
		if msg != "" {
			return
		}
		tData := (&AdminToken{}).Token(token)
		uid = util.Strval(tData["uid"])
		Clients[uid] = conn
	} else {
		return
	}
	for {
		mt, msg, err := conn.ReadMessage()
		// 断开连接
		if err != nil {
			for k, v := range Clients {
				if v == conn {
					delete(Clients, k)
				}
			}
			break
		}
		MsgType = mt
		// 用户ID
		id := "0"
		for k, v := range Clients {
			if v == conn {
				id = k
				break
			}
		}
		// 消息路由
		router(id, msg)
	}
}

/* 群发 */
func sendAll(data map[string]interface{}) {
	for _, conn := range Clients {
		res, _ := json.Marshal(data)
		if err := conn.WriteMessage(MsgType, res); err != nil {
			fmt.Println("[Socket] sendAll:", err)
		}
	}
}

/* 单发 */
func send(uid string, data map[string]interface{}) {
	res, _ := json.Marshal(data)
	conn, ok := Clients[uid]
	if !ok {
		return
	}
	conn.WriteMessage(MsgType, res)
}

/* 路由 */
func router(uid string, message []byte) {
	// 数据
	msg := make(map[string]interface{})
	_ = json.Unmarshal(message, &msg)
	// 消息
	if msg["type"] == "msg" {
		getMsg(uid, msg)
	} else {
		send(uid, gin.H{"type": "", "code": 0, "msg": "成功"})
	}
}

/* 消息 */
func getMsg(uid string, msg map[string]interface{}) {
	fmt.Println(uid, msg)
	// 群发
	if uid == "0" {
		sendAll(msg)
		return
	}
	// 单发
	send(uid, gin.H{
		"type": "msg",
		"code": 0,
		"msg":  "成功",
		"time": time.Now().Format("2006-01-02 15:04:05"),
	})
}
