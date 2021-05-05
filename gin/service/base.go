package service

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

/* 基础类 */
type Base struct{}

/* 输出到控制台 */
func (self *Base) Print(content ...interface{}) {
	fmt.Println(content...)
}

/* 返回JSON */
func (self *Base) GetJSON(c *gin.Context, data interface{}) {
	c.JSON(200, data)
}
