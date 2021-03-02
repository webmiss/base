package admin

import "github.com/gin-gonic/gin"

/* 首页 */
func Index(c *gin.Context) {
	c.JSON(200, gin.H{"code": 0, "msg": "Admin"})
}

/* 系统配置 */
func GetConfig(c *gin.Context) {
	c.JSON(200, gin.H{"code": 0, "msg": "成功", "list": "list"})
}
