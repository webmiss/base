package main

import (
	"context"
	"fmt"
	"os"
	"time"
	"webmis/library"
)

func main() {
	kafka := (&library.Kafka{})
	r := kafka.Consumer("logs", 0)
	// 配置
	// r.SetOffset(100)	//开始读取
	// 数据
	for {
		m, err := r.FetchMessage(context.Background())
		if err != nil {
			break
		}
		// 保存
		write(string(m.Value))
	}
	if err := r.Close(); err != nil {
		fmt.Println("Kafka关闭错误:", err)
	}
}

/* 记录 */
func write(text string) {
	// 时间
	now := time.Now()
	year := now.Format("2006")
	month := now.Format("01")
	day := now.Format("02")
	ctime := now.Format("2006-01-02 15:04:05")
	// 目录
	dir := "public/logs/" + year + "/" + month + "/"
	err := os.MkdirAll(dir, 0766)
	if err != nil {
		fmt.Println("[Logs] Mkdir:", err)
	}
	// 文件
	filename := day + ".text"
	f, err := os.OpenFile(dir+filename, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0660)
	if err != nil {
		fmt.Println("[Logs] Write:", err)
	}
	defer f.Close()
	// 追加
	f.WriteString("[Info] " + ctime + " " + text + "\n")
}
