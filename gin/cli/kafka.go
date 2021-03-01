package main

import (
	"context"
	"fmt"
	"webmis/library"
)

func main() {
	kafka := (&library.Kafka{})
	r := kafka.Consumer("test", 1)
	// 配置
	// r.SetOffset(100)	//开始读取
	// 数据
	for {
		m, err := r.FetchMessage(context.Background())
		if err != nil {
			break
		}
		fmt.Printf("message at offset %d: %s = %s\n", m.Offset, string(m.Key), string(m.Value))
	}
	if err := r.Close(); err != nil {
		fmt.Println("Kafka关闭错误:", err)
	}
}
