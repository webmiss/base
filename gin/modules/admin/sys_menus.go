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
	token := r.JsonName(json, "token")
	data := r.JsonName(json, "data")
	page := (&util.Type{}).Int(r.JsonName(json, "page"))
	limit := (&util.Type{}).Int(r.JsonName(json, "limit"))
	order := r.JsonName(json, "order")
	if order == "" {
		order = "fid DESC, sort, id DESC"
	}
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
	where, whereData := r.__getWhere(param)
	// 统计
	m := (&model.SysMenu{}).New()
	m.Columns("count(*) AS num")
	m.Where(where, whereData...)
	total := m.FindFirst()
	// 查询
	m.Columns("id", "fid", "title", "en", "ico", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "sort", "url", "controller", "action")
	m.Where(where, whereData...)
	m.Order(order)
	m.Page(page, limit)
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

/* 搜索条件 */
func (r SysMenus) __getWhere(param map[string]interface{}) (string, []interface{}) {
	// 参数
	fid := util.Trim(util.If(util.InKey("fid", param), param["fid"], ""))
	title := util.Trim(util.If(util.InKey("title", param), param["title"], ""))
	en := util.Trim(util.If(util.InKey("en", param), param["en"], ""))
	url := util.Trim(util.If(util.InKey("url", param), param["url"], ""))
	// 条件
	where := "fid like ? AND title like ? AND en like ? AND url like ?"
	whereData := []interface{}{"%" + fid + "%", "%" + title + "%", "%" + en + "%", "%" + url + "%"}
	return where, whereData
}

/* 添加 */
func (r SysMenus) Add(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token := r.JsonName(json, "token")
	data := r.JsonName(json, "data")
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
		"en":         util.Trim(util.If(util.InKey("en", param), param["en"], "")),
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
	token := r.JsonName(json, "token")
	id := r.JsonName(json, "id")
	data := r.JsonName(json, "data")
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
		"en":         util.Trim(util.If(util.InKey("en", param), param["en"], "")),
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
	token := r.JsonName(json, "token")
	data := r.JsonName(json, "data")
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
	token := r.JsonName(json, "token")
	id := r.JsonName(json, "id")
	data := r.JsonName(json, "data")
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

/* 获取菜单-全部 */
func (r *SysMenus) GetMenusAll(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token := r.JsonName(json, "token")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 全部菜单
	r._getMenus()
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "menus": r._getMenusAll("0")})
}

// 递归菜单
func (r *SysMenus) _getMenusAll(fid string) []map[string]interface{} {
	data := []map[string]interface{}{}
	M, ok := r.menus[fid]
	if !ok {
		M = data
	}
	for _, val := range M {
		id := (&util.Type{}).Strval(val["id"])
		tmp := map[string]interface{}{"icon": val["ico"], "label": val["title"], "value": id}
		menu := r._getMenusAll(id)
		if len(menu) > 0 {
			tmp["children"] = menu
		}
		data = append(data, tmp)
	}
	return data
}

/* 获取菜单-权限 */
func (r *SysMenus) GetMenusPerm(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token := r.JsonName(json, "token")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 全部菜单
	r._getMenus()
	// 用户权限
	r.permAll = (&service.AdminToken{}).Perm(token)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "menus": r._getMenusPerm("0")})
}

// 递归菜单
func (r *SysMenus) _getMenusPerm(fid string) []map[string]interface{} {
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
			if (perm & permVal) > 0 {
				action = append(action, v)
			}
		}
		// 数据
		value := map[string]interface{}{"url": val["url"], "controller": val["controller"], "action": action}
		tmp := map[string]interface{}{"icon": val["ico"], "label": val["title"], "en": val["en"], "value": value}
		menu := r._getMenusPerm(id)
		if len(menu) > 0 {
			tmp["children"] = menu
		}
		data = append(data, tmp)
	}
	return data
}

/* 全部菜单 */
func (r *SysMenus) _getMenus() {
	r.menus = map[string][]map[string]interface{}{}
	model := (&model.SysMenu{}).New()
	model.Columns("id", "fid", "title", "en", "url", "ico", "controller", "action")
	model.Order("sort, id")
	data := model.Find()
	for _, val := range data {
		fid := (&util.Type{}).Strval(val["fid"])
		if _, ok := r.menus[fid]; !ok {
			r.menus[fid] = []map[string]interface{}{}
		}
		r.menus[fid] = append(r.menus[fid], val)
	}
}
