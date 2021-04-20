package admin

import (
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

type SysUser struct {
	service.Base
}

/* 列表 */
func (r SysUser) List(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	data := c.PostForm("data")
	page := c.PostForm("page")
	limit := c.PostForm("limit")
	if util.Empty(data) || util.Empty(page) || util.Empty(limit) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	sea := map[string]string{}
	util.JsonDecode(data, &sea)
	var uname string
	if val, ok := sea["uname"]; ok {
		uname = val
	}
	// 统计
	model := (&model.User{}).New()
	model.Columns("count(*) AS num")
	total := model.FindFirst()
	// 查询
	model.Table("user as a")
	model.LeftJoin("user_info as b", "a.id=b.uid")
	model.LeftJoin("sys_perm as c", "a.id=c.uid")
	model.Columns(
		"a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
		"b.nickname", "b.position", "b.name", "b.gender", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday", "b.img",
		"c.role", "c.perm",
	)
	model.Where("a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?", "%"+uname+"%", "%"+uname+"%", "%"+uname+"%")
	model.Order("a.id DESC")
	model.Page(util.Int(page), util.Int(limit))
	list := model.Find()
	// 状态
	for _, val := range list {
		if util.Strval(val["state"]) == "1" {
			val["state"] = true
		} else {
			val["state"] = false
		}
		val["img"] = (&service.Data{}).Img(val["img"])
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list, "total": util.Int(total["num"])})
}
