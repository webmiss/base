package base

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

// Base :基础类
type Base struct{}

// Print :输出到控制台
func (self *Base) Print(content ...interface{}) {
	fmt.Println(content...)
}

// GetJSON :返回JSON
func (self *Base) GetJSON(c *gin.Context, data map[string]interface{}) {
	c.JSON(200, data)
}
