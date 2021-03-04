package admin

import (
	"fmt"
	"webmis/library"

	"github.com/gin-gonic/gin"
)

type User struct{}

/* 登录 */
func (this User) Login(c *gin.Context) {
	uname := c.PostForm("uname")
	passwd := c.PostForm("passwd")
	// 验证用户名
	fmt.Println(uname, passwd, (&library.Safety{}).IsRight("uname", uname), (&library.Safety{}).IsRight("passwd", passwd))
	c.JSON(200, gin.H{"code": 10, "msg": "成功"})
}
