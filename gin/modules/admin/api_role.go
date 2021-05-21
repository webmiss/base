package admin

import (
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

type ApiRole struct {
	service.Base
	menus   map[string][]map[string]interface{} //全部菜单
	permAll map[string]int64                    //用户权限
}

/* 列表 */
func (r ApiRole) List(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	data := c.PostForm("data")
	page := c.PostForm("page")
	limit := c.PostForm("limit")
	if util.Empty(data) || util.Empty(page) || util.Empty(limit) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	name := util.Trim(util.If(util.InKey("name", param), param["name"], ""))
	// 统计
	m := (&model.ApiRole{}).New()
	m.Columns("count(*) AS num")
	m.Where("name LIKE ?", "%"+name+"%")
	total := m.FindFirst()
	// 查询
	m.Columns("id", "name", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "perm")
	m.Where("name LIKE ?", "%"+name+"%")
	m.Page((&util.Type{}).Int(page), (&util.Type{}).Int(limit))
	list := m.Find()
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list, "total": (&util.Type{}).Int(total["num"])})
}

/* 添加 */
func (r ApiRole) Add(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	data := c.PostForm("data")
	if util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	name := util.Trim(util.If(util.InKey("name", param), param["name"], ""))
	if name == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "名称不能为空!"})
		return
	}
	// 数据
	m := (&model.ApiRole{}).New()
	m.Values(map[string]interface{}{"name": name, "ctime": util.Time()})
	if m.Insert() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "添加失败!"})
	}
}

/* 编辑 */
func (r ApiRole) Edit(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	id := c.PostForm("id")
	data := c.PostForm("data")
	if util.Empty(id) || util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	name := util.Trim(util.If(util.InKey("name", param), param["name"], ""))
	if name == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "名称不能为空!"})
		return
	}
	// 数据
	m := (&model.ApiRole{}).New()
	m.Set(map[string]interface{}{"name": name, "utime": util.Time()})
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 删除 */
func (r ApiRole) Del(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	data := c.PostForm("data")
	if util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	param := []string{}
	util.JsonDecode(data, &param)
	ids := util.Implode(",", param)
	// 执行
	m := (&model.ApiRole{}).New()
	m.Where("id in(" + ids + ")")
	if m.Delete() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "删除失败!"})
	}
}

/* 权限 */
func (r ApiRole) Perm(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	id := c.PostForm("id")
	perm := c.PostForm("perm")
	if util.Empty(id) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	m := (&model.ApiRole{}).New()
	m.Set(map[string]interface{}{"perm": perm, "utime": util.Time()})
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 权限-列表 */
func (r ApiRole) RoleList(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 查询
	m := (&model.SysRole{}).New()
	m.Columns("id", "name")
	data := m.Find()
	lists := []map[string]interface{}{}
	lists = append(lists, map[string]interface{}{"label": "无", "value": 0})
	for _, val := range data {
		lists = append(lists, map[string]interface{}{"label": val["name"], "value": (&util.Type{}).Int(val["id"])})
	}
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": lists})
}

/* 权限-列表 */
func (r *ApiRole) PermList(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	perm := c.PostForm("perm")
	// 全部菜单
	r.menus = map[string][]map[string]interface{}{}
	model := (&model.ApiMenu{}).New()
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
	r.permAll = r.permArr(perm)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": r._getMenu("0")})
}

// 权限-拆分
func (r ApiRole) permArr(perm string) map[string]int64 {
	permAll := map[string]int64{}
	arr := []string{}
	if !util.Empty(perm) {
		arr = util.Explode(" ", perm)
	}
	for _, val := range arr {
		s := util.Explode(":", val)
		permAll[s[0]] = (&util.Type{}).Int64(s[1])
	}
	return permAll
}

// 递归菜单
func (r *ApiRole) _getMenu(fid string) []map[string]interface{} {
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
			perm = 0
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
			checked := util.If(perm&permVal > 0, true, false)
			action = append(action, map[string]interface{}{
				"id":      (&util.Type{}).Int64(val["id"]) + (&util.Type{}).Int64(v["perm"]),
				"label":   v["name"],
				"checked": checked,
				"perm":    v["perm"],
			})
		}
		// 数据
		_, checked := r.permAll[id]
		tmp := map[string]interface{}{"id": val["id"], "label": val["title"], "checked": checked}
		if (&util.Type{}).Strval(val["fid"]) == "0" {
			tmp["show"] = true
		}
		// children
		menu := r._getMenu(id)
		if len(menu) > 0 {
			tmp["children"] = menu
		} else if len(action) > 0 {
			tmp["action"] = true
			tmp["children"] = action
		}
		data = append(data, tmp)
	}
	return data
}
