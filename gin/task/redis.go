package task

import (
	"fmt"
	"time"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

type Redis struct{}

/* 日志-消费者 */
func (r Redis) Logs() {
	redis := (&library.Redis{}).New("")
	defer redis.Close()
	for {
		data := redis.BLPop("logs", 10)
		if data == nil {
			continue
		}
		// 保存
		msg := util.Strval(data[1])
		res := r.LogsWrite(msg)
		if !res {
			fmt.Println("[Logs] Write:", "日志记录失败!")
			fmt.Println(msg)
		}
	}
}

/* 日志-写入 */
func (Redis) LogsWrite(msg string) bool {
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
