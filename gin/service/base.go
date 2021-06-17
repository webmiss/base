package service

import (
	"fmt"
	"os/exec"

	"github.com/gin-gonic/gin"
)

/* 基础类 */
type Base struct{}

/* 返回JSON */
func (Base) GetJSON(c *gin.Context, data interface{}) {
	c.JSON(200, data)
}

/* 记录回调 */
func (Base) TmpCallback(text string) {
	cmd := exec.Command("/bin/bash", "-c", "echo "+text+" > public/upload/callback.txt")
	cmd.Run()
}

/* 输出到控制台 */
func (Base) Print(content ...interface{}) {
	fmt.Println(content...)
}
