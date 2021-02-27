package middleware

import (
	"github.com/kataras/iris/v12"
)

/* 允许跨域请求 */
func Cors(c iris.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS")
	c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
	if c.Request().Method == "OPTIONS" {
		c.Header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization")
		c.StatusCode(204)
		return
	}
	c.Next()
}
