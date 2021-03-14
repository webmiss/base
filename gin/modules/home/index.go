package home

import (
	"webmis/base"
	"webmis/model"

	"github.com/gin-gonic/gin"
)

// Index :Web
type Index struct {
	base.Base
}

// Index :首页
func (r *Index) Index(c *gin.Context) {
	demo := (&model.Demo{}).New()
	demo.Columns("uid", "title")
	data := demo.Find()
	r.Print(data)
	// db := config.DB
	// r.Print(db, db.Ping())
	// perm := (&library.CasBin{}).New()
	// res := perm.Add("admin", "test2", "read")
	// v := perm.Verify("admin", "test2", "read")
	// r.Print(v)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Web"})
}
