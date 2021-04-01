package admin

import (
	"webmis/model"
	"webmis/service"

	"github.com/gin-gonic/gin"
)

/* Admin */
type Index struct {
	service.Base
	service.Data
}

/* 首页 */
func (r Index) Index(c *gin.Context) {
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Admin"})
}

/* 系统配置 */
func (r Index) GetConfig(c *gin.Context) {
	// 查询
	config := (&model.SysConfig{}).New()
	config.Where("name in (?,?,?,?)", "title", "copy", "logo", "login_bg")
	config.Columns("name", "val")
	sql, args := config.SelectSQL()
	rows := config.Query(sql, args)
	defer rows.Close()
	if rows == nil {
		return
	}
	// 数据
	list := map[string]interface{}{}
	var name string
	var val string
	for rows.Next() {
		rows.Scan(&name, &val)
		if name == "logo" || name == "login_bg" {
			if val != "" {
				list[name] = r.Img(val)
			} else {
				list[name] = ""
			}
			list[name] = val
		} else {
			list[name] = val
		}
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list})
}
