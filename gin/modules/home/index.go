package home

import (
	"webmis/base"
	"webmis/model"

	"github.com/gin-gonic/gin"
)

type Index struct {
	base.Base
}

/* 首页 */
func (self *Index) Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	demo.Columns("uid", "title")
	demo.Where("title LIKE ?", "%事务%")
	data := demo.FindFirst()
	// 添加
	demo.Values(map[string]interface{}{
		"uid":   nil,
		"title": "Go-添加",
	})
	id := demo.Insert()
	self.Print(id)
	// 关闭
	demo.Close()
	// 返回
	self.GetJSON(c, gin.H{"code": 0, "msg": "Web", "data": data})
}
