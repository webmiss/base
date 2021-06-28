package middleware

import (
	"time"
	"webmis/config"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

/* 访问日志 */
func Logs() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 参数
		ip := c.ClientIP()
		method := c.Request.Method
		path := c.Request.URL.Path
		user_agent := c.Request.UserAgent()
		// 写入-文件
		if config.Env().LogDb {
			(&service.Logs{}).LogsDB(ip, method, path, user_agent)
		}
		// 写入-文件
		if config.Env().LogFile {
			(&service.Logs{}).Log(gin.H{
				"ip":         ip,
				"method":     method,
				"path":       path,
				"user_agent": user_agent,
				"time":       time.Now().UnixNano(),
			})
		}
	}
}
