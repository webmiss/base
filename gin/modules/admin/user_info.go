package admin

import (
	"strings"
	"webmis/base"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

// UserInfo :用户
type UserInfo struct {
	base.Base
}

// List :列表
func (r UserInfo) List(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	tData := (&service.AdminToken{}).Token(token)
	// 查询
	model := (&model.UserInfo{}).New()
	model.Columns("nickname", "name", "gender", "birthday", "position", "img")
	model.Where("uid=?", tData["uid"])
	list := model.FindFirst()
	// 数据
	list["birthday"] = (&util.Util{}).Date("2006-01-02", list["birthday"])
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list})
}

// Edit :编辑
func (r UserInfo) Edit(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	tData := (&service.AdminToken{}).Token(token)
	// 参数
	data := c.PostForm("data")
	if data == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	param := map[string]interface{}{}
	(&util.Util{}).JsonDecode(data, &param)
	// 数据
	model := (&model.UserInfo{}).New()
	info := map[string]interface{}{
		"nickname": strings.Trim(param["nickname"].(string), " "),
		"name":     strings.Trim(param["name"].(string), " "),
		"gender":   strings.Trim(param["gender"].(string), " "),
		"birthday": (&util.Util{}).Strtotime(strings.Trim(param["birthday"].(string), " "), "2006-01-02"),
		"position": strings.Trim(param["position"].(string), " "),
	}
	model.Set(info)
	model.Where("uid=?", tData["uid"])
	model.Update()
	// 返回
	info["uname"] = tData["uname"]
	info["img"] = param["img"]
	info["birthday"] = (&util.Util{}).Date("2006-01-02", info["birthday"])
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "uinfo": info})
}
