package service

import (
	"webmis/config"
	"webmis/library"
	"webmis/model"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 日志 */
type Logs struct{}

/* 写入数据库 */
func (Logs) LogsDB(ip string, method string, path string, user_agent string) {
	// 数据
	os := (&util.Os{}).System(user_agent)
	browser := (&util.Os{}).Browser(user_agent)
	time := util.Time()
	// 模型
	model := (&model.Logs{}).New()
	model.Values(map[string]interface{}{
		"source":     config.Env().LogSource,
		"ip":         ip,
		"os":         os,
		"browser":    browser,
		"ctime":      time,
		"method":     method,
		"url":        path,
		"user_agent": user_agent,
	})
	model.Insert()
}

/* 访问日志 */
func (l Logs) Log(data interface{}) {
	text := util.JsonEncode(gin.H{"type": "log", "data": data})
	go l.Writer(text)
}

/* 信息日志 */
func (l Logs) Info(data interface{}) {
	text := util.JsonEncode(gin.H{"type": "info", "data": data})
	go l.Writer(text)
}

/* 操作日志 */
func (l Logs) Action(data interface{}) {
	text := util.JsonEncode(gin.H{"type": "action", "data": data})
	go l.Writer(text)
}

/* 错误日志 */
func (l Logs) Error(data interface{}) {
	text := util.JsonEncode(gin.H{"type": "error", "data": data})
	go l.Writer(text)
}

/* 发送 */
func (l Logs) Writer(text []byte) {
	redis := (&library.Redis{}).New("")
	redis.RPush("logs", string(text))
	defer redis.Close()
}
