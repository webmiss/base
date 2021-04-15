package middleware

import (
	"time"
	"webmis/config"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

/* 访问日志 */
func Logs() gin.HandlerFunc {
	// 是否记录
	if !config.Env().LogOn {
		return nil
	}
	// 数据
	return func(c *gin.Context) {
		(&service.Logs{}).Log(gin.H{
			"ip":         c.ClientIP(),
			"method":     c.Request.Method,
			"path":       c.Request.URL.Path,
			"user_agent": c.Request.UserAgent(),
			"time":       time.Now().UnixNano(),
		})
	}
}
