package library

import (
	"fmt"
	"net/url"
	"webmis/config"

	"github.com/gorilla/websocket"
)

/* Socket客户端 */
type Socket struct{}

/* 发送 */
func (Socket) Send(tp string) {
	cfg := config.Socket()
	u := url.URL{Scheme: cfg.Type, Host: cfg.Host + ":" + cfg.Port, Path: cfg.URL, RawQuery: "?type=" + tp + "&token=" + config.Env().Key}
	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		fmt.Println("Socket:", err)
	}
	println(c)
}
