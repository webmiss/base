package task

import (
	"fmt"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

/* 日志 */
type Redis struct{}

/* 消费者 */
func (r Redis) Logs() {
	for {
		redis := (&library.Redis{}).New("")
		data := redis.BLPop("logs", config.Redis().Timeout)
		redis.Close()
		if data == nil {
			continue
		}
		// 保存
		msg := util.Strval(data[1])
		res := r._logsWrite(msg)
		if !res {
			fmt.Println("[Logs] Write:", "日志记录失败!")
			fmt.Println(msg)
		}
	}
}

/* 日志-写入 */
func (Redis) _logsWrite(msg string) bool {
	// 数据
	data := map[string]interface{}{}
	util.JsonDecode(msg, &data)
	// 时间
	ctime := util.Date("2006-01-02 15:04:05")
	year := ctime[0:4]
	month := ctime[5:7]
	day := ctime[8:10]
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
	content := util.Strval(data["data"])
	err := (&library.FileEo{}).WriterEnd(file, "["+name+"] "+ctime+" "+content+"\n")
	if err != nil {
		return false
	}
	return true
}
