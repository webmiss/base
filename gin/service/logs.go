package service

import (
	"context"
	"encoding/json"
	"fmt"
	"webmis/config"

	"github.com/gin-gonic/gin"
	"github.com/segmentio/kafka-go"
)

// Logs :日志
type Logs struct {
	conn *kafka.Conn
}

// Conn :连接
func (l *Logs) Conn(topic string, partition int) bool {
	if l.conn != nil {
		return true
	}
	cfg := (&config.Kafka{}).Config()
	conn, err := kafka.DialLeader(context.Background(), cfg.Type, cfg.Host+":"+cfg.Port, topic, partition)
	if err != nil {
		if cfg.Log {
			fmt.Println("[Kafka] Conn:", err)
		}
		return false
	}
	l.conn = conn
	return true
}

// Send :发送
func (l *Logs) Send(topic string, partition int, text []byte) {
	if l.Conn(topic, partition) != true {
		cfg := (&config.Kafka{}).Config()
		if cfg.Log {
			fmt.Println("[Logs] Fail:", string(text))
		}
		return
	}
	l.conn.WriteMessages(kafka.Message{Value: text})
	defer l.conn.Close()
}

// Log :记录日志
func (l *Logs) Log(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "log",
		"data": content,
	})
	go l.Send("logs", 0, str)
}

// Info :记录信息
func (l *Logs) Info(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "info",
		"data": content,
	})
	go l.Send("logs", 1, str)
}

// Action :记录操作
func (l *Logs) Action(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "action",
		"data": content,
	})
	go l.Send("logs", 2, str)
}

// Error :记录错误
func (l *Logs) Error(content interface{}) {
	str, _ := json.Marshal(gin.H{
		"type": "error",
		"data": content,
	})
	go l.Send("logs", 3, str)
}
