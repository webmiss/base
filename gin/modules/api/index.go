package api

import (
	"webmis/service"

	"github.com/gin-gonic/gin"
)

/* API */
type Index struct {
	service.Base
}

/* 首页 */
func (r Index) Index(c *gin.Context) {
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "GO Api"})
}
