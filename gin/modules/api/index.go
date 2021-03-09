package api

import (
	"webmis/base"

	"github.com/gin-gonic/gin"
)

type Index struct {
	base.Base
}

func (self Index) Index(c *gin.Context) {
	c.JSON(200, gin.H{"code": 0, "msg": "Api"})
}
