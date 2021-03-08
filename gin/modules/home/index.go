package home

import (
	"webmis/base"

	"github.com/gin-gonic/gin"
)

type Index struct {
	base.Base
}

/* 首页 */
func (self *Index) Index(c *gin.Context) {
	// 返回
	self.GetJSON(c, gin.H{"code": 0, "msg": "Web"})
}
