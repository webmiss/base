package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

// Recovery :异常捕获
func Recovery(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("panic: %v\n", r)
			c.JSON(200, gin.H{"code": 5000, "msg": r})
			c.Abort()
		}
	}()
	c.Next()
}

// HandleNotFound :404
func HandleNotFound(c *gin.Context) {
	c.JSON(200, gin.H{"code": 404, "msg": "404 Not Found"})
}
