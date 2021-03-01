package home

import (
	"webmis/model"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	data := demo.SelectRow()
	demo.Close()
	// Kafka
	// kafka := (&library.Kafka{}).Conn("test", 0)
	// kafka.TopicList()
	// kafka.Producer("Go Test1")
	// kafka.Producer("Go Test2")
	// kafka.Producer("Go Test3")
	// kafka.Close()
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": data})
}
