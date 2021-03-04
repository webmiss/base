package home

import (
	"github.com/gin-gonic/gin"
)

/* 首页 */
func Index(c *gin.Context) {
	c.JSON(200, gin.H{"code": 0, "msg": "Web"})
}
