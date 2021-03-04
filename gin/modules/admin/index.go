package admin

import (
	"webmis/model"

	"github.com/gin-gonic/gin"
)

type Home struct{}

/* 首页 */
func (this Home) Index(c *gin.Context) {
	c.JSON(200, gin.H{"code": 0, "msg": "Admin"})
}

/* 系统配置 */
func (this Home) GetConfig(c *gin.Context) {
	// 查询
	config := (&model.SysConfig{}).Init()
	config.Where("name in (?,?,?,?)", "title", "copy", "logo", "login_bg")
	config.Columns("name", "val")
	rows, _ := config.Find()
	list := make(map[string]interface{})
	// 数据
	var name string
	var val string
	for rows.Next() {
		rows.Scan(&name, &val)
		list[name] = val
	}
	// 返回
	c.JSON(200, gin.H{"code": 0, "msg": "成功", "list": list})
}
