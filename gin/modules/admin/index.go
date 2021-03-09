package admin

import (
	"webmis/base"
	"webmis/config"
	"webmis/model"

	"github.com/gin-gonic/gin"
)

type Index struct {
	base.Base
	config.Env
}

/* 首页 */
func (self Index) Index(c *gin.Context) {
	self.GetJSON(c, gin.H{"code": 0, "msg": "Admin"})
}

/* 系统配置 */
func (self Index) GetConfig(c *gin.Context) {
	// 查询
	config := (&model.SysConfig{}).Init()
	config.Where("name in (?,?,?,?)", "title", "copy", "logo", "login_bg")
	config.Columns("name", "val")
	sql, args := config.SelectSql()
	rows, _ := config.Query(sql, args)
	defer rows.Close()
	list := make(map[string]interface{})
	// 数据
	var name string
	var val string
	for rows.Next() {
		rows.Scan(&name, &val)
		if name == "logo" || name == "login_bg" {
			if val != "" {
				list[name] = self.BaseUrl + val
			} else {
				list[name] = ""
			}
			list[name] = val
		} else {
			list[name] = val
		}
	}
	// 关闭
	config.Close()
	// 返回
	self.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list})
}
