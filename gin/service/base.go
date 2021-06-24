package service

import (
	"fmt"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 基础类 */
type Base struct{}

/* 返回JSON */
func (Base) GetJSON(c *gin.Context, data interface{}) {
	c.JSON(200, data)
}

/* JSON参数 */
func (b Base) JsonName(param map[string]interface{}, name string) (string, bool) {
	res, ok := param[name]
	if !ok {
		return "", false
	}
	return (&util.Type{}).Strval(res), true
}

/* 输出到控制台 */
func (Base) Print(content ...interface{}) {
	fmt.Println(content...)
}
