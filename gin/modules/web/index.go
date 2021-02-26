package web

import (
	"log"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	log.Fatalln("Test: ", "测试")
	c.String(200, "Web")
}
