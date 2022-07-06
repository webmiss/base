package service

import (
	"webmis/config"
	"webmis/library"
)

/* 日志 */
type Logs struct{}

/* 写入数据库 */
func (Logs) File(file string, content string) {
	(&library.FileEo{}).New(config.Env().RootDir)
	(&library.FileEo{}).WriterEnd(file, content)
}

