package api

import (
	"webmis/base"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

// Demo :Demo
type Demo struct {
	base.Base
}

// Token :验证Token
func (r Demo) Token(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.ApiToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "验证成功"})
}

// List :验证Url
func (r Demo) List(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.ApiToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "验证成功"})
}

// Perm :验证Url
func (r Demo) Perm(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.ApiToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "验证成功"})
}
