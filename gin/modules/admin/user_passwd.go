package admin

import (
	"webmis/library"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 用户密码 */
type UserPasswd struct {
	service.Base
}

/* 编辑 */
func (r UserPasswd) Edit(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	tData := (&service.AdminToken{}).Token(token)
	// 参数
	passwd := c.PostForm("passwd")
	passwdNew := c.PostForm("passwdNew")
	if passwd == passwdNew {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "不能与原密码相同!"})
		return
	}
	if !(&library.Safety{}).IsRight("passwd", passwd) || !(&library.Safety{}).IsRight("passwd", passwdNew) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "密码为6～16位!"})
		return
	}
	// 数据
	model := (&model.User{}).New()
	model.Columns("id")
	model.Where("id=? AND password=?", tData["uid"], util.Md5(passwd))
	uData := model.FindFirst()
	if uData == nil {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "当前密码错误!"})
		return
	}
	model.Set(map[string]interface{}{"password": util.Md5(passwdNew)})
	model.Where("id=?", tData["uid"])
	if !model.Update() {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "修改失败!"})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
}
