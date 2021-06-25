package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

/* 允许跨域请求 */
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")                              //域名
		c.Header("Access-Control-Allow-Methods", "*")                             //请求方式
		c.Header("Access-Control-Allow-Headers", "x-requested-with,content-type") //预检响应
		c.Header("Access-Control-Max-Age", "2592000")                             //OPTIONS(30天)
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}
