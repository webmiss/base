package library

import (
	"context"
	"fmt"
	"webmis/config"

	"github.com/segmentio/kafka-go"
)

type Kafka struct{}

/* 生产者 */
func (Kafka) Producer(topic string, partition int) *kafka.Conn {
	cfg := config.Kafka()
	w, err := kafka.DialLeader(context.Background(), cfg.Type, cfg.Host+":"+cfg.Port, topic, partition)
	if err != nil {
		if cfg.Log {
			fmt.Println("[Kafka] Conn:", err)
		}
		return nil
	}
	return w
}

/* 消费者 */
func (Kafka) Consumer(topic string) *kafka.Reader {
	cfg := config.Kafka()
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{cfg.Host + ":" + cfg.Port},
		GroupID:  "Group_" + topic,
		Topic:    topic,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})
	return r
}
