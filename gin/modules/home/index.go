package home

import (
	"webmis/base"
	"webmis/library"

	"github.com/gin-gonic/gin"
)

// Index :Web
type Index struct {
	base.Base
}

// Index :首页
func (r *Index) Index(c *gin.Context) {
	sub := "alice"
	obj := "data1"
	act := "read1"
	param := (&library.CasBin{}).Verify(sub, obj, act)
	r.Print(param)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Web"})
}
