package library

import (
	"encoding/json"
	"fmt"
	"net/url"
	"webmis/config"

	"github.com/gorilla/websocket"
)

/* Socket客户端 */
type Socket struct{}

var Conn *websocket.Conn

/* 发送 */
func (Socket) Send(tp string, data map[string]interface{}) {
	cfg := config.Socket()
	u := url.URL{Scheme: cfg.Type, Host: cfg.Host + ":" + cfg.Port, Path: cfg.URL, RawQuery: "&type=" + tp + "&token=" + config.Env().Key}
	conn, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		fmt.Println("[Socket] Conn:", err)
	}
	defer conn.Close()
	res, _ := json.Marshal(data)
	if err := conn.WriteMessage(1, res); err != nil {
		fmt.Println("[Socket] Send:", err)
	}
}
