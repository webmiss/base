package home

import (
	"fmt"
	"webmis/library"
	"webmis/model"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	fmt.Println(demo)
	// data := demo.SelectRow()
	// demo.Close()
	// Kafka
	if kafka, _ := (&library.Kafka{}).Conn("logs", 0); kafka != nil {
		kafka.TopicList()
		kafka.Producer("Go Test1")
		kafka.Producer("Go Test2")
		kafka.Producer("Go Test3")
		kafka.Close()
	}
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": "data"})
}
