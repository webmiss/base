package service

import (
	"encoding/json"
	"fmt"
	"webmis/config"
	"webmis/library"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
)

// Logs :日志
type Logs struct{}

// Log :访问日志
func (k Logs) Log(content interface{}) {
	text, _ := json.Marshal(gin.H{
		"type": "log",
		"data": content,
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 0), text)
}

// Info :信息日志
func (k Logs) Info(content interface{}) {
	text, _ := json.Marshal(gin.H{
		"type": "info",
		"data": content,
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 1), text)
}

// Action :操作日志
func (k Logs) Action(content interface{}) {
	text, _ := json.Marshal(gin.H{
		"type": "action",
		"data": content,
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 2), text)
}

// Error :错误日志
func (k Logs) Error(content string, err error) {
	text, _ := json.Marshal(gin.H{
		"type": "error",
		"data": fmt.Sprintf(content, err),
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 3), text)
}

// Writer :发送
func (Logs) Writer(conn *kafka.Conn, text []byte) {
	cfg := (&config.Kafka{}).Config()
	_, err := conn.WriteMessages(kafka.Message{Value: text})
	if err != nil && cfg.Log {
		fmt.Println("[Logs] Writer:", err)
		fmt.Println("[Logs] Writer:", string(text))
	}
}
