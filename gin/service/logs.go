package service

import (
	"context"
	"encoding/json"
	"fmt"
	"webmis/config"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
)

type Logs struct {
	conn *kafka.Conn
}

/* 连接 */
func (this *Logs) Conn(topic string, partition int) bool {
	if this.conn != nil {
		return true
	}
	cfg := (&config.Kafka{}).Config()
	conn, err := kafka.DialLeader(context.Background(), cfg.Type, cfg.Host+":"+cfg.Port, topic, partition)
	if err != nil {
		fmt.Println("[Kafka] Conn:", err)
		return false
	}
	this.conn = conn
	return true
}

/* 发送 */
func (this *Logs) Send(topic string, partition int, text []byte) {
	if this.Conn(topic, partition) != true {
		fmt.Println("[Logs] Fail:", string(text))
		return
	}
	this.conn.WriteMessages(kafka.Message{Value: text})
	defer this.conn.Close()
}

/* 日志 */
func (this *Logs) Log(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "log",
		"data": content,
	})
	go this.Send("logs", 0, str)
}

/* 信息 */
func (this *Logs) Info(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "info",
		"data": content,
	})
	go this.Send("logs", 1, str)
}

/* 操作 */
func (this *Logs) Action(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "action",
		"data": content,
	})
	go this.Send("logs", 2, str)
}

/* 错误 */
func (this *Logs) Error(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "error",
		"data": content,
	})
	go this.Send("logs", 3, str)
}
