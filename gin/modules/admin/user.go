package admin

import (
	"webmis/base"
	"webmis/library"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

// User :用户
type User struct {
	base.Base
}

// Login :登录
func (r User) Login(c *gin.Context) {
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
	model := (&model.User{}).New()
	model.Table("user AS a")
	model.LeftJoin("user_info AS b", "a.id=b.uid")
	model.LeftJoin("user_perm AS c", "a.id=c.uid")
	model.Where("(a.uname=? OR a.tel=? OR a.email=?) AND a.password=?", uname, uname, uname, (&util.Util{}).Md5(passwd))
	model.Columns("a.id", "a.state", "b.position", "b.nickname", "b.name", "b.gender", "b.birthday", "b.img", "c.state_admin")
	data := model.FindFirst()
	// 是否存在
	if data == nil {
		c.JSON(200, gin.H{"code": 4000, "msg": "帐号或密码错误!"})
		return
	}
	// 是否禁用
	if data["state"] != "1" {
		c.JSON(200, gin.H{"code": 4000, "msg": "该用户已被禁用!"})
		return
	}
	if data["state_admin"] != "1" {
		c.JSON(200, gin.H{"code": 4000, "msg": "该用户不允许登录!"})
		return
	}
	// 登录时间
	model.Table("user")
	model.Set(map[string]interface{}{"ltime": (&util.Util{}).Date("2006-01-02 15:04:05")})
	model.Where("id=?", data["id"])
	model.Update()
	// Token
	token := (&service.AdminToken{}).Create(map[string]interface{}{
		"uid":   data["id"],
		"uname": uname,
	})
	// 用户信息
	user := map[string]interface{}{
		"uid":      data["id"],
		"uname":    uname,
		"position": data["position"],
		"nickname": data["nickname"],
		"name":     data["name"],
		"gender":   data["gender"],
		"img":      (&util.Util{}).Img(data["img"]),
	}
	// 返回
	c.JSON(200, gin.H{"code": 10, "msg": "成功", "token": token, "uinfo": user})
}
