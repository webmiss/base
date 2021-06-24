package demo

import (
	"webmis/config"
	"webmis/library/tencent"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* TWebLive直播 */
type Tweblive struct {
	service.Base
}

/* 列表 */
func (r Tweblive) List(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 数据
	data := []map[string]interface{}{}
	data = append(data, map[string]interface{}{
		"id":       1,
		"group_id": "@TGS#aRHBAOFHK",
		"name":     "xxx直播1",
	})
	data = append(data, map[string]interface{}{
		"id":       2,
		"group_id": "@TGS#aRHBAOFHK",
		"name":     "xxx直播2",
	})
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": data})
}

/* 用户信息 */
func (r Tweblive) UserInfo(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	tData := (&service.AdminToken{}).Token(token)
	// 配置
	cfg := config.TRTC()
	userId := (&util.Type{}).Strval(tData["uid"])
	userSin := (&tencent.Signature{}).UserSig(userId)
	// 返回
	uinfo := map[string]interface{}{
		"sdk_app_id":       cfg.SDKAppID,
		"user_id":          userId,
		"user_sig":         userSin,
		"live_domain_name": cfg.PlayDomain,
	}
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "uinfo": uinfo})
}
