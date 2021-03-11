package api

import (
	"webmis/base"

	"github.com/gin-gonic/gin"
)

// Index :API
type Index struct {
	base.Base
}

// Index :首页
func (r Index) Index(c *gin.Context) {
	c.JSON(200, gin.H{"code": 0, "msg": "Api"})
}
