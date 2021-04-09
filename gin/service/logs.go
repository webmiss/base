package service

import (
	"webmis/library"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 日志 */
type Logs struct{}

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
