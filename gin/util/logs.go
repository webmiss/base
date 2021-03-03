package util

import (
	"context"
	"encoding/json"
	"fmt"
	"time"
	"webmis/config"

	"github.com/segmentio/kafka-go"
)

type Logs struct{}

/* 连接 */
func (this *Logs) Send(topic string, partition int, text ...string) {
	cfg := (&config.Kafka{}).Config()
	conn, err := kafka.DialLeader(context.Background(), cfg.Type, cfg.Host+":"+cfg.Port, topic, partition)
	if err != nil {
		fmt.Println("[Kafka] Conn:", err)
		return
	}
	conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
	args := make([]kafka.Message, 0, 10)
	for _, v := range text {
		tmp := kafka.Message{Value: []byte(v)}
		args = append(args, tmp)
	}
	_, err = conn.WriteMessages(args...)
	if err != nil {
		fmt.Println("[Kafka] Write:", err)
	}
	defer conn.Close()
}

/* 信息 */
func (this *Logs) Info(text ...string) {
	this.Send("logs", 0, text...)
}
func (this *Logs) InfoMap(data map[string]interface{}) {
	str, _ := json.Marshal(data)
	this.Info(string(str))
}

/* 成功 */
func (this *Logs) Success(text ...string) {
	this.Send("logs", 1, text...)
}

/* 警告 */
func (this *Logs) Warning(text ...string) {
	this.Send("logs", 2, text...)
}

/* 错误 */
func (this *Logs) Error(text ...string) {
	this.Send("logs", 3, text...)
}
