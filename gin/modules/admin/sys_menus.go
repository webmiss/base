package admin

import (
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 系统菜单 */
type SysMenus struct {
	service.Base
	menus   map[string][]map[string]interface{} //全部菜单
	permAll map[string]int64                    //用户权限
}

/* 列表 */
func (r SysMenus) List(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	data, _ := r.JsonName(json, "data")
	page, _ := r.JsonName(json, "page")
	limit, _ := r.JsonName(json, "limit")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(data) || util.Empty(page) || util.Empty(limit) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 条件
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	fid := util.Trim(util.If(util.InKey("fid", param), param["fid"], ""))
	title := util.Trim(util.If(util.InKey("title", param), param["title"], ""))
	url := util.Trim(util.If(util.InKey("url", param), param["url"], ""))
	// 统计
	m := (&model.SysMenu{}).New()
	m.Columns("count(*) AS num")
	m.Where("fid like ? AND title like ? AND url like ?", "%"+fid+"%", "%"+title+"%", "%"+url+"%")
	total := m.FindFirst()
	// 查询
	m.Columns("id", "fid", "title", "ico", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "sort", "url", "controller", "action")
	m.Where("fid like ? AND title like ? AND url like ?", "%"+fid+"%", "%"+title+"%", "%"+url+"%")
	m.Order("sort DESC", "fid")
	m.Page((&util.Type{}).Int(page), (&util.Type{}).Int(limit))
	list := m.Find()
	// 数据
	for _, val := range list {
		if str := (&util.Type{}).Strval(val["action"]); str != "" {
			action := []map[string]interface{}{}
			util.JsonDecode(str, &action)
			val["action"] = action
		} else {
			val["action"] = ""
		}
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list, "total": (&util.Type{}).Int(total["num"])})
}

/* 添加 */
func (r SysMenus) Add(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	data, _ := r.JsonName(json, "data")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	title := util.Trim(util.If(util.InKey("title", param), param["title"], ""))
	if title == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "名称不能为空!"})
		return
	}
	// 模型
	m := (&model.SysMenu{}).New()
	m.Values(map[string]interface{}{
		"fid":        util.Trim(util.If(util.InKey("fid", param), param["fid"], 0)),
		"title":      title,
		"url":        util.Trim(util.If(util.InKey("url", param), param["url"], "")),
		"ico":        util.Trim(util.If(util.InKey("ico", param), param["ico"], "")),
		"sort":       util.Trim(util.If(util.InKey("sort", param), param["sort"], 0)),
		"controller": util.Trim(util.If(util.InKey("controller", param), param["controller"], "")),
		"ctime":      util.Time(),
	})
	if m.Insert() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "添加失败!"})
	}
}

/* 编辑 */
func (r SysMenus) Edit(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	id, _ := r.JsonName(json, "id")
	data, _ := r.JsonName(json, "data")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(id) || util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	title := util.Trim(util.If(util.InKey("title", param), param["title"], ""))
	if title == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "名称不能为空!"})
		return
	}
	// 模型
	m := (&model.SysMenu{}).New()
	m.Set(map[string]interface{}{
		"fid":        util.Trim(util.If(util.InKey("fid", param), param["fid"], 0)),
		"title":      title,
		"url":        util.Trim(util.If(util.InKey("url", param), param["url"], "")),
		"ico":        util.Trim(util.If(util.InKey("ico", param), param["ico"], "")),
		"sort":       util.Trim(util.If(util.InKey("sort", param), param["sort"], 0)),
		"controller": util.Trim(util.If(util.InKey("controller", param), param["controller"], "")),
		"utime":      util.Time(),
	})
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 删除 */
func (r SysMenus) Del(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	data, _ := r.JsonName(json, "data")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	param := []string{}
	util.JsonDecode(data, &param)
	ids := util.Implode(",", param)
	// 模型
	m := (&model.SysMenu{}).New()
	m.Where("id in(" + ids + ")")
	if m.Delete() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "删除失败!"})
	}
}

/* 动作权限 */
func (r SysMenus) Perm(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	id, _ := r.JsonName(json, "id")
	data, _ := r.JsonName(json, "data")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(id) || util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 模型
	m := (&model.SysMenu{}).New()
	m.Set(map[string]interface{}{"action": data})
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 获取菜单 */
func (r *SysMenus) GetMenus(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	// 验证
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
		fid := (&util.Type{}).Strval(val["fid"])
		if _, ok := r.menus[fid]; !ok {
			r.menus[fid] = []map[string]interface{}{}
		}
		r.menus[fid] = append(r.menus[fid], val)
	}
	// 用户权限
	r.permAll = (&service.AdminToken{}).Perm(token)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "menus": r._getMenu("0")})
}

// 递归菜单
func (r *SysMenus) _getMenu(fid string) []map[string]interface{} {
	data := []map[string]interface{}{}
	M, ok := r.menus[fid]
	if !ok {
		M = data
	}
	for _, val := range M {
		// 菜单权限
		id := (&util.Type{}).Strval(val["id"])
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
			permVal := (&util.Type{}).Int64(v["perm"])
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
