package home

import (
	"webmis/model"

	"github.com/gin-gonic/gin"
)

/* 首页 */
func Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	demo.Columns("uid", "title")
	demo.Where("title LIKE ?", "%事务%")
	data := demo.FindFirst()
	// 返回
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": data})
}
