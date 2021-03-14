package home

import (
	"webmis/base"

	"github.com/gin-gonic/gin"
)

// Index :Web
type Index struct {
	base.Base
}

// Index :首页
func (r *Index) Index(c *gin.Context) {
	// demo := (&model.Demo{}).New()
	// demo.Columns("uid", "title")
	// data := demo.Find()
	// r.Print(data)

	// perm := (&library.CasBin{})
	// res := perm.Add("admin", "test4", "read")
	// perm.Remove("admin", "test3", "read")
	// v := perm.Verify("admin", "test4", "read")
	// r.Print(res, v)

	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Web"})
}
