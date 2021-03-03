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
	defer r.Close()
	// 配置
	// r.SetOffset(100)	//开始读取
	// 数据
	ctx := context.Background()
	for {
		m, err := r.FetchMessage(ctx)
		if err != nil {
			break
		}
		// 保存
		res := write(string(m.Value))
		fmt.Println("Logs:", string(m.Value), res)
		if res == true {
			if err := r.CommitMessages(ctx, m); err != nil {
				fmt.Println("[Logs] Commit:", err)
			}
		}
	}
}

/* 记录 */
func write(text string) bool {
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
		return false
	}
	// 文件
	filename := day + ".text"
	f, err := os.OpenFile(dir+filename, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0660)
	if err != nil {
		fmt.Println("[Logs] Write:", err)
		return false
	}
	defer f.Close()
	// 追加
	f.WriteString("[Info] " + ctime + " " + text + "\n")
	return true
}
