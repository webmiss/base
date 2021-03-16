package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Recovery :异常捕获
func Recovery(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("panic: %v\n", r)
			c.JSON(http.StatusOK, gin.H{"code": 5000, "msg": r})
			c.Abort()
		}
	}()
	c.Next()
}

// HandleNotFound :404
func HandleNotFound(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"code": 404, "msg": ""})
}
