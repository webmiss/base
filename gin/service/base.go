package service

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

/* 基础类 */
type Base struct{}

/* 返回JSON */
func (Base) GetJSON(c *gin.Context, data interface{}) {
	c.JSON(200, data)
}

/* 输出到控制台 */
func (Base) Print(content ...interface{}) {
	fmt.Println(content...)
}
