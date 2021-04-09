package service

import (
	"encoding/json"
	"fmt"
	"webmis/config"
	"webmis/library"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
)

/* 日志 */
type LogsKafka struct {
	Base
}

/* 访问日志 */
func (k LogsKafka) Log(content interface{}) {
	text, _ := json.Marshal(gin.H{
		"type": "log",
		"data": content,
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 0), text)
}

/* 信息日志 */
func (k LogsKafka) Info(content interface{}) {
	text, _ := json.Marshal(gin.H{
		"type": "info",
		"data": content,
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 1), text)
}

/* 操作日志 */
func (k LogsKafka) Action(content interface{}) {
	text, _ := json.Marshal(gin.H{
		"type": "action",
		"data": content,
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 2), text)
}

/* 错误日志 */
func (k LogsKafka) Error(content string, err error) {
	text, _ := json.Marshal(gin.H{
		"type": "error",
		"data": fmt.Sprintf(content, err),
	})
	go k.Writer((&library.Kafka{}).Producer("logs", 3), text)
}

/* 发送 */
func (l LogsKafka) Writer(conn *kafka.Conn, text []byte) {
	if conn == nil {
		return
	}
	cfg := config.Kafka()
	_, err := conn.WriteMessages(kafka.Message{Value: text})
	if err != nil && cfg.Log {
		l.Print("[Logs] Writer:", err)
		l.Print("[Logs] Writer:", string(text))
	}
}
