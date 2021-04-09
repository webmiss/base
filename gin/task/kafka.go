package task

import (
	"context"
	"fmt"
	"time"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

type Kafka struct{}

/* 日志-消费者 */
func (k Kafka) Logs() {
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
		msg := string(m.Value)
		res := k.LogsWrite(msg)
		if res == true {
			if err := r.CommitMessages(ctx, m); err != nil {
				fmt.Println("[Logs] Commit:", err)
			}
		}
	}
}

/* 日志-写入 */
func (Kafka) LogsWrite(msg string) bool {
	// 数据
	data := map[string]interface{}{}
	util.JsonDecode(msg, &data)
	// 时间
	now := time.Now()
	year := now.Format("2006")
	month := now.Format("01")
	day := now.Format("02")
	// 目录
	name := data["type"].(string)
	path := "upload/logs/" + name + "/" + year + "/" + month + "/"
	(&library.FileEo{}).New(config.Env().RootDir)
	if !(&library.FileEo{}).Mkdir(path) {
		fmt.Println("[Logs] Mkdir:", "创建目录失败!")
		return false
	}
	// 追加
	file := path + day + ".text"
	ctime := now.Format("2006-01-02 15:04:05")
	content := util.Strval(data["data"])
	err := (&library.FileEo{}).WriterEnd(file, "["+name+"] "+ctime+" "+content+"\n")
	if err != nil {
		return false
	}
	return true
}
