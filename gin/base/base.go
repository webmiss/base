package base

import (
	"fmt"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

type Base struct{}

/* 输出到控制台 */
func (self *Base) Print(content ...interface{}) {
	fmt.Println(content...)
}

/* 返回JSON */
func (self *Base) GetJSON(c *gin.Context, data map[string]interface{}) {
	c.JSON(200, data)
}

/* 记录错误 */
func (self *Base) LogsErr(err error) {
	if gin.Mode() == gin.ReleaseMode {
		(&service.Logs{}).Error(err)
	}
}
