package middleware

import (
	"time"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

/* 访问日志 */
func Logs() gin.HandlerFunc {
	return func(c *gin.Context) {
		(&service.Logs{}).Log(gin.H{
			"ip":         c.ClientIP(),
			"method":     c.Request.Method,
			"path":       c.Request.URL.Path,
			"user_agent": c.Request.UserAgent(),
			"time":       time.Now().Format("2006-01-02 15:04:05"),
		})
	}
}
