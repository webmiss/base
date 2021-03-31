package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"
	"webmis/library"
	"webmis/util"
)

func main() {
	// 连接
	r := (&library.Kafka{}).Consumer("logs")
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
		res := write(m.Value)
		if res == true {
			if err := r.CommitMessages(ctx, m); err != nil {
				fmt.Println("[Logs] Commit:", err)
			}
		}
	}
}

/* 记录 */
func write(text []byte) bool {
	// 数据
	data := map[string]interface{}{}
	err := json.Unmarshal(text, &data)
	if err != nil {
		fmt.Println("[Logs] Json:", err)
		return false
	}
	// 时间
	now := time.Now()
	year := now.Format("2006")
	month := now.Format("01")
	day := now.Format("02")
	// 目录
	name := data["type"].(string)
	dir := "public/logs/" + name + "/" + year + "/" + month + "/"
	if err := os.MkdirAll(dir, 0766); err != nil {
		fmt.Println("[Logs] Mkdir:", err)
		return false
	}
	// 文件
	filename := day + ".text"
	f, err := os.OpenFile(dir+filename, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0766)
	if err != nil {
		fmt.Println("[Logs] Write:", err)
		return false
	}
	defer f.Close()
	// 追加
	ctime := now.Format("2006-01-02 15:04:05")
	content := util.Strval(data["data"])
	f.WriteString("[" + name + "] " + ctime + " " + content + "\n")
	return true
}
