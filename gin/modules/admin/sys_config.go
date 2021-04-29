package admin

import (
	"webmis/library"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

type SysConfig struct {
	service.Base
}

/* 列表 */
func (r SysConfig) List(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 查询
	model := (&model.SysConfig{}).New()
	model.Columns("name", "val")
	data := model.Find()
	list := map[string]interface{}{}
	// 数据
	for _, val := range data {
		if val["name"] == "logo" || val["name"] == "login_bg" {
			list[val["name"].(string)] = (&service.Data{}).Img(val["val"])
		} else {
			list[val["name"].(string)] = val["val"]
		}
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list})
}

/* 编辑 */
func (r SysConfig) Edit(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	data := c.PostForm("data")
	if data == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	m := (&model.SysConfig{}).New()
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	for key, val := range param {
		if key == "logo" || key == "login_bg" {
			continue
		}
		m.Set(map[string]interface{}{"val": util.Trim(val)})
		m.Where("name=?", key)
		if !m.Update() {
			r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
			return
		}
	}
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
}

/* 头像 */
func (r SysConfig) Upimg(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	name := c.PostForm("name")
	base64 := c.PostForm("base64")
	if base64 == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 类型
	if name != "logo" && name != "login_bg" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "类型错误!"})
		return
	}
	// 上传
	ImgDir := "upload/admin/img/"
	img := (&library.Upload{}).Base64(map[string]interface{}{"path": ImgDir, "base64": base64})
	if img == "" {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "上传失败!"})
		return
	}
	// 数据
	m := (&model.SysConfig{}).New()
	m.Columns("val")
	m.Where("name=?", name)
	imgData := m.FindFirst()
	m.Set(map[string]interface{}{"val": ImgDir + img})
	m.Where("name=?", name)
	if !m.Update() {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "上传失败!"})
		return
	}
	// 清理
	rmImg := imgData["val"].(string)
	(&library.FileEo{}).RemoveAll(rmImg)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "img": (&service.Data{}).Img(ImgDir + img)})
}
