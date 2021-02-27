package web

import (
	"webmis/model"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	data := demo.SelectRow()
	demo.Close()
	// c.String(200, "Web")
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": data})
}
