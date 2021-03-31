package admin

import (
	"strconv"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 系统菜单 */
type SysMenus struct {
	service.Base
	menus   map[string][]map[string]interface{}
	permAll map[string]int64
}

/* 获取菜单 */
func (r *SysMenus) GetMenus(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 全部菜单
	r.menus = map[string][]map[string]interface{}{}
	model := (&model.SysMenu{}).New()
	model.Columns("id", "fid", "title", "url", "ico", "controller", "action")
	model.Order("sort DESC, id")
	data := model.Find()
	for _, val := range data {
		fid := util.Strval(val["fid"])
		if _, ok := r.menus[fid]; !ok {
			r.menus[fid] = []map[string]interface{}{}
		}
		r.menus[fid] = append(r.menus[fid], val)
	}
	// 全部权限
	r.permAll = (&service.AdminToken{}).Perm(token)
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
		// 菜单权限
		perm, ok := r.permAll[id]
		if !ok {
			continue
		}
		// 动作权限
		action := []map[string]interface{}{}
		actionStr := val["action"].(string)
		actionArr := []map[string]interface{}{}
		if actionStr != "" {
			util.JsonDecode(actionStr, &actionArr)
		}
		for _, v := range actionArr {
			permVal, _ := strconv.ParseInt(util.Strval(v["perm"]), 10, 64)
			if v["type"].(string) == "1" && perm&permVal > 0 {
				action = append(action, v)
			}
		}
		// 数据
		value := map[string]interface{}{"url": val["url"], "controller": val["controller"], "action": action}
		tmp := map[string]interface{}{"icon": val["ico"], "label": val["title"], "value": value}
		menu := r._getMenu(id)
		if len(menu) > 0 {
			tmp["children"] = menu
		}
		data = append(data, tmp)
	}
	return data
}
