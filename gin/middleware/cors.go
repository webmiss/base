package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

/* 允许跨域请求 */
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")                                                                      //域名
		c.Header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")                                       //请求方式
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Range, Content-Disposition, Content-Description") //预检响应
		c.Header("Access-Control-Max-Age", "2592000")                                                                     //OPTIONS(30天)
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}
