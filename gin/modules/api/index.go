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
	r.GetJSON(c, gin.H{"code": 0, "msg": "Api"})
}
