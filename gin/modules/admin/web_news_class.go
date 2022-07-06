package admin

import (
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

type WebNewsClass struct {
	service.Base
}

/* 列表 */
func (r WebNewsClass) List(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token := r.JsonName(json, "token")
	data := r.JsonName(json, "data")
	page := (&util.Type{}).Int(r.JsonName(json, "page"))
	limit := (&util.Type{}).Int(r.JsonName(json, "limit"))
	order := r.JsonName(json, "order")
	if order == "" {
		order = "sort DESC"
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
	m := (&model.WebNewsClass{}).New()
	m.Columns("count(*) AS num")
	m.Where(where, whereData...)
	total := m.FindFirst()
	// 查询
	m.Columns("id", "name", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "state", "sort")
	m.Where(where, whereData...)
	m.Order(order)
	m.Page(page, limit)
	list := m.Find()
	// 数据
	for _, val := range list {
		if (&util.Type{}).Strval(val["state"]) == "1" {
			val["state"] = true
		} else {
			val["state"] = false
		}
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list, "total": (&util.Type{}).Int(total["num"])})
}

/* 搜索条件 */
func (r WebNewsClass) __getWhere(param map[string]interface{}) (string, []interface{}) {
	// 参数
	name := util.Trim(util.If(util.InKey("name", param), param["name"], ""))
	// 条件
	where := "name like ?"
	whereData := []interface{}{"%" + name + "%"}
	return where, whereData
}

/* 添加 */
func (r WebNewsClass) Add(c *gin.Context) {
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
	name := util.Trim(util.If(util.InKey("name", param), param["name"], ""))
	state := util.If((&util.Type{}).Bool(param["state"]), "1", "0")
	sort := util.Trim(util.If(util.InKey("sort", param), param["sort"], 0))
	if name == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "名称不能为空!"})
		return
	}
	// 模型
	m := (&model.WebNewsClass{}).New()
	m.Values(map[string]interface{}{"name": name, "ctime": util.Time(), "utime": util.Time(), "state": state, "sort": sort})
	if m.Insert() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "添加失败!"})
	}
}

/* 编辑 */
func (r WebNewsClass) Edit(c *gin.Context) {
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
	name := util.Trim(util.If(util.InKey("name", param), param["name"], ""))
	state := util.If((&util.Type{}).Bool(param["state"]), "1", "0")
	sort := util.Trim(util.If(util.InKey("sort", param), param["sort"], 0))
	if name == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "名称不能为空!"})
		return
	}
	// 模型
	m := (&model.WebNewsClass{}).New()
	m.Set(map[string]interface{}{"name": name, "utime": util.Time(), "state": state, "sort": sort})
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 删除 */
func (r WebNewsClass) Del(c *gin.Context) {
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
	m := (&model.WebNewsClass{}).New()
	m.Where("id in(" + ids + ")")
	if m.Delete() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "删除失败!"})
	}
}

/* 权限 */
func (r WebNewsClass) State(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token := r.JsonName(json, "token")
	id := r.JsonName(json, "id")
	state := r.JsonName(json, "state")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(id) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 模型
	m := (&model.WebNewsClass{}).New()
	m.Set(map[string]interface{}{"state": util.If((&util.Type{}).Bool(state), "1", "0"), "utime": util.Time()})
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}
