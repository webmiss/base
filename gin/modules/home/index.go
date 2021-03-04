package home

import (
	"webmis/model"

	"github.com/gin-gonic/gin"
)

/* 首页 */
func Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	data := demo.SelectRow()
	demo.Close()
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": data})
}
