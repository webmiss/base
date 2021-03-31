package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
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
	// 参数
	tp := c.Query("type")
	token := c.Query("token")
	s.Print("Token:", token)
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
	} else if tp == "admin" {
		msg := (&AdminToken{}).Verify(token, "")
		if msg != "" {
			return
		}
		tData := (&AdminToken{}).Token(token)
		uid = util.Strval(tData["uid"])
		s.Print("Admin:", uid, reflect.TypeOf(uid).String(), tData)
	} else {
		return
	}
	// 保存连接
	if Clients == nil {
		Clients = map[string]*websocket.Conn{}
	}
	Clients[uid] = conn
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
		var id string
		for k, v := range Clients {
			if v == conn {
				id = k
				break
			}
		}
		s.Print("Clients:", Clients)
		// 消息路由
		router(Clients[id], msg)
	}
}

/* 路由 */
func router(conn *websocket.Conn, message []byte) {
	// 数据
	msg := make(map[string]interface{})
	_ = json.Unmarshal(message, &msg)
	// 消息
	if msg["type"] == "msg" {
		getMsg(conn, msg)
	} else {
		res, _ := json.Marshal(gin.H{"type": "", "code": 0, "msg": "成功"})
		conn.WriteMessage(MsgType, res)
	}
}

/* 消息 */
func getMsg(conn *websocket.Conn, msg map[string]interface{}) {
	fmt.Println(msg)
	res, _ := json.Marshal(gin.H{
		"type": "msg",
		"code": 0,
		"msg":  "成功",
		"time": time.Now().Format("2006-01-02 15:04:05"),
	})
	conn.WriteMessage(MsgType, res)
}
