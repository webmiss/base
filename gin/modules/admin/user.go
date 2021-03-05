package admin

import (
	"fmt"
	"webmis/library"
	"webmis/model"

	"github.com/gin-gonic/gin"
)

type User struct{}

/* 登录 */
func (this User) Login(c *gin.Context) {
	uname := c.PostForm("uname")
	passwd := c.PostForm("passwd")
	// 验证用户名
	safety := (&library.Safety{})
	if safety.IsRight("uname", uname) != true && safety.IsRight("tel", uname) != true && safety.IsRight("email", uname) != true {
		c.JSON(200, gin.H{"code": 4000, "msg": "请输入用户名/手机/邮箱"})
		return
	}
	// 密码长度
	if safety.IsRight("passwd", passwd) != true {
		c.JSON(200, gin.H{"code": 4000, "msg": "请输入6~16位密码"})
		return
	}
	// 查询
	model := (&model.User{}).Init()
	model.Table("user AS a")
	model.LeftJoin("user_info AS b", "a.id=b.uid")
	model.LeftJoin("user_info AS b", "a.id=b.uid")
	model.Where("(a.uname=? OR a.tel=? OR a.email=?) AND a.password=?", uname, uname, uname, passwd)
	model.Columns("a.id", "a.state", "b.position", "b.nickname", "b.name", "b.gender", "b.birthday", "b.img", "c.state_admin")
	sql, arge := model.SelectSql()
	fmt.Println(sql, arge)
	c.JSON(200, gin.H{"code": 10, "msg": "成功"})
}
