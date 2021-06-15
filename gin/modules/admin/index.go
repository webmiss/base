package admin

import (
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* Admin */
type Index struct {
	service.Base
}

/* 首页 */
func (r Index) Index(c *gin.Context) {
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Admin"})
}

/* 系统配置 */
func (r Index) GetConfig(c *gin.Context) {
	// 查询
	model := (&model.SysConfig{}).New()
	model.Where("name in (?,?,?,?)", "title", "copy", "logo", "login_bg")
	model.Columns("name", "val")
	data := model.Find()
	// 数据
	list := map[string]interface{}{}
	for _, val := range data {
		name := (&util.Type{}).Strval(val["name"])
		if name == "logo" || name == "login_bg" {
			list[name] = (&service.Data{}).Img(val["val"])
		} else {
			list[name] = val["val"]
		}
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list})
}
