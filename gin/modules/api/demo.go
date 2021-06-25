package api

import (
	"webmis/service"

	"github.com/gin-gonic/gin"
)

/* Demo */
type Demo struct {
	service.Base
}

/* 验证Token */
func (r Demo) Token(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	// 验证
	msg := (&service.ApiToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "验证成功"})
}

/* 验证Url */
func (r Demo) List(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	// 验证
	msg := (&service.ApiToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "验证成功"})
}
func (r Demo) Perm(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	// 验证
	msg := (&service.ApiToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "验证成功"})
}
