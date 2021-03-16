package admin

import (
	"webmis/base"
	"webmis/model"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

// SysMenus :系统菜单
type SysMenus struct {
	base.Base
	menus map[string][]map[string]interface{}
}

// GetMenus :获取菜单
func (r *SysMenus) GetMenus(c *gin.Context) {
	r.menus = make(map[string][]map[string]interface{})
	// 全部菜单
	model := (&model.SysMenu{}).New()
	model.Columns("id", "fid", "title", "url", "ico")
	model.Order("sort DESC, id")
	data := model.Find()
	for _, val := range data {
		fid := util.Strval(val["fid"])
		if _, ok := r.menus[fid]; !ok {
			r.menus[fid] = []map[string]interface{}{}
		}
		r.menus[fid] = append(r.menus[fid], val)
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "menus": r._getMenu("0")})
}

// 递归菜单
func (r *SysMenus) _getMenu(fid string) []map[string]interface{} {
	data := []map[string]interface{}{}
	M := data
	if _, ok := r.menus[fid]; ok {
		M = r.menus[fid]
	}
	for _, val := range M {
		id := util.Strval(val["id"])
		tmp := map[string]interface{}{
			"icon":  val["ico"],
			"label": val["title"],
			"value": val["url"],
		}
		menu := r._getMenu(id)
		if len(menu) > 0 {
			tmp["children"] = menu
		}
		data = append(data, tmp)
	}
	return data
}
