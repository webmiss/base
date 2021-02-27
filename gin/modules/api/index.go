package api

import "github.com/gin-gonic/gin"

func Index(c *gin.Context) {
	c.JSON(200, gin.H{"code": 0, "msg": "Api"})
}
