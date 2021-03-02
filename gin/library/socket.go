package library

import (
	"fmt"
	"net/http"
	"webmis/service"

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

	fmt.Println("参数:", tp, token)
	for {
		mt, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		// 消息路由
		(&service.Msgs{}).Router(conn, mt, msg)
	}
}
