package demo

import (
	"webmis/library/tencent"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

type Index struct {
	service.Base
}

/* 首页 */
func (r Index) Index(c *gin.Context) {
	userSig := (&tencent.Im{}).UserSig(123456)
	res := (&tencent.Im{}).VerifySig(123456, userSig)
	r.Print(res)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Demo"})
}
