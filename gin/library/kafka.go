package library

import (
	"context"
	"fmt"
	"log"
	"time"
	"webmis/config"

	"github.com/segmentio/kafka-go"
)

type Kafka struct {
	conn *kafka.Conn
}

/* 连接 */
func (this *Kafka) Conn(topic string, partition int) *Kafka {
	cfg := (&config.Kafka{}).Config()
	conn, err := kafka.DialLeader(context.Background(), cfg.Type, cfg.Host+":"+cfg.Port, topic, partition)
	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}
	this.conn = conn
	return this
}

/* 关闭 */
func (this *Kafka) Close() {
	if err := this.conn.Close(); err != nil {
		log.Fatal("failed to close writer:", err)
	}
}

/* 主题列表 */
func (this *Kafka) TopicList() {
	cfg := (&config.Kafka{}).Config()
	conn, err := kafka.Dial(cfg.Type, cfg.Host+":"+cfg.Port)
	if err != nil {
		fmt.Println(err.Error())
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

/* 生产者 */
func (this *Kafka) Producer(content string) {
	this.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
	_, err := this.conn.WriteMessages(
		kafka.Message{Value: []byte(content)},
	)
	if err != nil {
		log.Fatal("failed to write messages:", err)
	}
}

/* 消费者 */
func (this *Kafka) Consumer(topic string, partition int) *kafka.Reader {
	cfg := (&config.Kafka{}).Config()
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:        []string{cfg.Host + ":" + cfg.Port},
		Topic:          topic,
		Partition:      partition,
		MinBytes:       10e3, // 10KB
		MaxBytes:       10e6, // 10MB
		CommitInterval: time.Second,
	})
	// 开始读取
	return r
}
