package util

import (
	"context"
	"encoding/json"
	"fmt"
	"webmis/config"

	"github.com/segmentio/kafka-go"
)

type Logs struct {
	conn *kafka.Conn
}

/* 连接 */
func (this *Logs) Conn(topic string, partition int) {
	if this.conn != nil {
		return
	}
	cfg := (&config.Kafka{}).Config()
	conn, err := kafka.DialLeader(context.Background(), cfg.Type, cfg.Host+":"+cfg.Port, topic, partition)
	if err != nil {
		fmt.Println("[Kafka] Conn:", err)
		return
	}
	this.conn = conn
}

/* 发送 */
func (this *Logs) Send(topic string, partition int, text ...string) {
	this.Conn(topic, partition)
	args := make([]kafka.Message, 0, 10)
	for _, v := range text {
		tmp := kafka.Message{Value: []byte(v)}
		args = append(args, tmp)
	}
	this.conn.WriteMessages(args...)
	defer this.conn.Close()
}

/* 信息 */
func (this *Logs) Info(text ...string) {
	go this.Send("logs", 0, text...)
}
func (this *Logs) InfoMap(data map[string]interface{}) {
	str, _ := json.Marshal(data)
	this.Info(string(str))
}

/* 成功 */
func (this *Logs) Success(text ...string) {
	this.Send("logs", 1, text...)
}
func (this *Logs) SuccessMap(data map[string]interface{}) {
	str, _ := json.Marshal(data)
	this.Success(string(str))
}

/* 警告 */
func (this *Logs) Warning(text ...string) {
	this.Send("logs", 2, text...)
}
func (this *Logs) WarningMap(data map[string]interface{}) {
	str, _ := json.Marshal(data)
	this.Warning(string(str))
}

/* 错误 */
func (this *Logs) Error(text ...string) {
	this.Send("logs", 3, text...)
}
func (this *Logs) ErrorMap(data map[string]interface{}) {
	str, _ := json.Marshal(data)
	this.Error(string(str))
}
