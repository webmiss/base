package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

/* 异常捕获 */
func Recovery(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("panic: %v\n", r)
			c.JSON(200, gin.H{"code": 500, "msg": r})
			c.Abort()
		}
	}()
	c.Next()
}

// HandleNotFound :404
func HandleNotFound(c *gin.Context) {
	c.JSON(200, gin.H{"code": 404, "msg": "Not Found"})
}
