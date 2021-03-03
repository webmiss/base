package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

/* 启动 */
func Socket(c *gin.Context) {
	// 验证
	tp := c.Query("type")
	token := c.Query("token")
	conn, err := (&websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}).Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer conn.Close()
	// 验证
	fmt.Println("参数:", tp, token)
	for {
		mt, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		// 消息路由
		router(conn, mt, msg)
	}
}

/* 路由 */
func router(conn *websocket.Conn, mt int, message []byte) {
	// 数据
	msg := make(map[string]interface{})
	_ = json.Unmarshal(message, &msg)
	// 消息
	if msg["type"] == "msg" {
		getMsg(conn, mt, msg)
	} else {
		res, _ := json.Marshal(gin.H{"type": "", "code": 0, "msg": "成功"})
		conn.WriteMessage(mt, res)
	}
}

/* 消息 */
func getMsg(conn *websocket.Conn, mt int, msg map[string]interface{}) {
	fmt.Println(msg)
	res, _ := json.Marshal(gin.H{
		"type": "msg",
		"code": 0,
		"msg":  "成功",
		"time": time.Now().Format("2006-01-02 15:04:05"),
	})
	conn.WriteMessage(mt, res)
}
