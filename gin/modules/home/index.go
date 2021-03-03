package home

import (
	"webmis/model"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	data := demo.SelectRow()
	demo.Close()
	// 日志
	(&util.Logs{}).Info("日志")
	(&util.Logs{}).InfoMap(gin.H{"type": "msg", "data": 1})
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": data})
}
