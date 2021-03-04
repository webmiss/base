package library

import (
	"fmt"
	"time"
	"webmis/config"

	"github.com/segmentio/kafka-go"
)

type Kafka struct {
}

/* 消费者 */
func (this *Kafka) Consumer(topic string, partition int) *kafka.Reader {
	cfg := (&config.Kafka{}).Config()
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:        []string{cfg.Host + ":" + cfg.Port},
		GroupID:        topic,
		Topic:          topic,
		Partition:      partition,
		MinBytes:       10e3, // 10KB
		MaxBytes:       10e6, // 10MB
		CommitInterval: time.Second,
	})
	return r
}

/* 主题列表 */
func (this *Kafka) TopicList() {
	cfg := (&config.Kafka{}).Config()
	conn, err := kafka.Dial(cfg.Type, cfg.Host+":"+cfg.Port)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer conn.Close()
	// 读取分区
	partitions, err := conn.ReadPartitions()
	if err != nil {
		fmt.Println(err.Error())
	}
	// 列表
	m := map[string]struct{}{}
	for _, p := range partitions {
		m[p.Topic] = struct{}{}
	}
	for k := range m {
		fmt.Println(k)
	}
}
