package admin

import (
	"webmis/config"
	"webmis/library"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

var dirRoot = "upload/"

// SysFile :用户
type SysFile struct {
	service.Base
}

// List :列表
func (r SysFile) List(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	path := c.PostForm("path")
	(&library.FilesEo{}).New(config.Env().RootDir + dirRoot)
	list := (&library.FilesEo{}).List(path)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "url": config.Env().BaseURL + dirRoot, "data": list})
}
