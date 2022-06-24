package admin

import (
	"webmis/config"
	"webmis/library"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

type SysUser struct {
	service.Base
}

/* 列表 */
func (r SysUser) List(c *gin.Context) {
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
	uname := util.Trim(util.If(util.InKey("uname", param), param["uname"], ""))
	nickname := util.Trim(util.If(util.InKey("nickname", param), param["nickname"], ""))
	name := util.Trim(util.If(util.InKey("name", param), param["name"], ""))
	department := util.Trim(util.If(util.InKey("department", param), param["department"], ""))
	position := util.Trim(util.If(util.InKey("position", param), param["position"], ""))
	where := "(a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?) AND b.nickname LIKE ? AND b.name LIKE ? AND b.department LIKE ? AND b.position LIKE ?"
	whereData := []interface{}{"%" + uname + "%", "%" + uname + "%", "%" + uname + "%", "%" + nickname + "%", "%" + name + "%", "%" + department + "%", "%" + position + "%"}
	// 统计
	m := (&model.User{}).New()
	m.Table("user as a")
	m.LeftJoin("user_info as b", "a.id=b.uid")
	m.Columns("count(*) AS num")
	m.Where(where, whereData...)
	total := m.FindFirst()
	// 查询
	m.Table("user as a")
	m.LeftJoin("user_info as b", "a.id=b.uid")
	m.LeftJoin("sys_perm as c", "a.id=c.uid")
	m.LeftJoin("api_perm as d", "a.id=d.uid")
	m.Columns(
		"a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
		"b.nickname", "b.position", "b.name", "b.gender", "b.img", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday",
		"c.role AS sys_role", "c.perm AS sys_perm",
		"d.role AS api_role", "d.perm AS api_perm",
	)
	m.Where(where, whereData...)
	m.Order("a.id DESC")
	m.Page((&util.Type{}).Int(page), (&util.Type{}).Int(limit))
	list := m.Find()
	// 数据
	for _, val := range list {
		val["uid"] = (&util.Type{}).Strval(val["uid"])
		if (&util.Type{}).Strval(val["state"]) == "1" {
			val["state"] = true
		} else {
			val["state"] = false
		}
		val["img"] = (&service.Data{}).Img(val["img"])
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list, "total": (&util.Type{}).Int(total["num"])})
}

/* 添加 */
func (r SysUser) Add(c *gin.Context) {
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
	tel := util.Trim(util.If(util.InKey("tel", param), param["tel"], ""))
	passwd := util.Trim(util.If(util.InKey("passwd", param), param["passwd"], config.Env().Password))
	// 验证
	if !(&library.Safety{}).IsRight("tel", tel) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "手机号码有误!"})
		return
	}
	if !(&library.Safety{}).IsRight("passwd", passwd) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "密码为6～16位!"})
		return
	}
	// 是否存在
	m := (&model.User{}).New()
	m.Columns("id")
	m.Where("tel=?", tel)
	user := m.FindFirst()
	if !util.Empty(user) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "该用户已存在!"})
		return
	}
	// 新增
	uid := (&service.Data{}).Mist("ID")
	conn := m.DBConn()
	tx, _ := conn.Begin()
	// 用户
	m1 := (&model.User{}).New()
	m1.Values(map[string]interface{}{"id": uid, "tel": tel, "password": (&util.Hash{}).Md5(passwd)})
	sql, args := m1.InsertSQL()
	_, err1 := tx.Exec(sql, args...)
	// 详情
	m2 := (&model.UserInfo{}).New()
	m2.Values(map[string]interface{}{"uid": uid})
	sql, args = m2.InsertSQL()
	_, err2 := tx.Exec(sql, args...)
	// 权限-System
	m3 := (&model.SysPerm{}).New()
	m3.Values(map[string]interface{}{"uid": uid})
	sql, args = m3.InsertSQL()
	_, err3 := tx.Exec(sql, args...)
	// 权限-Api
	m4 := (&model.ApiPerm{}).New()
	m4.Values(map[string]interface{}{"uid": uid})
	sql, args = m4.InsertSQL()
	_, err4 := tx.Exec(sql, args...)
	if err1 != nil || err2 != nil || err3 != nil || err4 != nil {
		tx.Rollback()
		r.GetJSON(c, gin.H{"code": 5000, "msg": "添加失败!"})
	} else {
		// 提交
		tx.Commit()
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	}
}

/* 编辑 */
func (r SysUser) Edit(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	uid, _ := r.JsonName(json, "uid")
	data, _ := r.JsonName(json, "data")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(uid) || util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	tel := util.Trim(util.If(util.InKey("tel", param), param["tel"], ""))
	passwd := util.Trim(util.If(util.InKey("passwd", param), param["passwd"], ""))
	// 验证
	if !(&library.Safety{}).IsRight("tel", tel) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "手机号码有误!"})
		return
	}
	// 是否存在
	m := (&model.User{}).New()
	m.Columns("id")
	m.Where("tel=?", tel)
	user := m.FindFirst()
	if util.Empty(user) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "该用户不存在!"})
		return
	}
	// 更新
	uData := map[string]interface{}{"tel": tel}
	if passwd != "" {
		uData["password"] = (&util.Hash{}).Md5(passwd)
	}
	m.Set(uData)
	m.Where("id=?", uid)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 删除 */
func (r SysUser) Del(c *gin.Context) {
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
	// 执行
	m1 := (&model.User{}).New()
	m1.Where("id in(" + ids + ")")
	m2 := (&model.UserInfo{}).New()
	m2.Where("uid in(" + ids + ")")
	m3 := (&model.SysPerm{}).New()
	m3.Where("uid in(" + ids + ")")
	m4 := (&model.ApiPerm{}).New()
	m4.Where("uid in(" + ids + ")")
	if m1.Delete() && m2.Delete() && m3.Delete() && m4.Delete() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "删除失败!"})
	}
}

/* 状态 */
func (r SysUser) State(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	uid, _ := r.JsonName(json, "uid")
	state, _ := r.JsonName(json, "state")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(uid) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 超级管理员
	tData := (&service.AdminToken{}).Token(token)
	if uid == "1" && (&util.Type{}).Strval(tData["uid"]) != "1" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "您不是超级管理员!"})
		return
	}
	// 更新
	state = (&util.Type{}).Strval(util.If(state == "1", "1", "0"))
	m := (&model.User{}).New()
	m.Set(map[string]interface{}{"state": state})
	m.Where("id=?", uid)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 权限 */
func (r SysUser) Perm(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	tp, _ := r.JsonName(json, "type")
	uid, _ := r.JsonName(json, "uid")
	role, _ := r.JsonName(json, "role")
	perm, _ := r.JsonName(json, "perm")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(uid) || util.Empty(tp) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 超级管理员
	tData := (&service.AdminToken{}).Token(token)
	if uid == "1" && (&util.Type{}).Strval(tData["uid"]) != "1" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "您不是超级管理员!"})
		return
	}
	// 类型
	if tp == "admin" && r._permSys(uid, role, perm) {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else if tp == "api" && r._permApi(uid, role, perm) {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

// 权限-System
func (r SysUser) _permSys(uid string, role string, perm string) bool {
	// 数据
	env := config.Env()
	uData := map[string]interface{}{"role": role, "perm": perm, "utime": util.Time()}
	// 系统权限
	m := (&model.SysPerm{}).New()
	m.Set(uData)
	m.Where("uid=?", uid)
	if m.Update() {
		r.Print(m.GetSQL())
		// 角色权限
		if util.Empty(perm) {
			m1 := (&model.SysRole{}).New()
			m1.Columns("perm")
			m1.Where("id=?", role)
			data := m1.FindFirst()
			if res, ok := data["perm"]; ok {
				perm = (&util.Type{}).Strval(res)
			}
		}
		// 更新权限
		return r._setPerm(env.AdminTokenPrefix+"_perm_"+uid, perm)
	}
	return false
}

// 权限-Api
func (r SysUser) _permApi(uid string, role string, perm string) bool {
	// 数据
	env := config.Env()
	uData := map[string]interface{}{"role": role, "perm": perm, "utime": util.Time()}
	// 模型
	m := (&model.ApiPerm{}).New()
	m.Set(uData)
	m.Where("uid=?", uid)
	if m.Update() {
		// 角色权限
		if util.Empty(perm) {
			m1 := (&model.ApiRole{}).New()
			m1.Columns("perm")
			m1.Where("id=?", role)
			data := m1.FindFirst()
			if res, ok := data["perm"]; ok {
				perm = (&util.Type{}).Strval(res)
			}
		}
		// 更新权限
		return r._setPerm(env.ApiTokenPrefix+"_perm_"+uid, perm)
	}
	return false
}

// 更新权限
func (r SysUser) _setPerm(key string, perm string) bool {
	redis := (&library.Redis{}).New("")
	redis.Set(key, perm)
	redis.Close()
	return true
}

/* 个人信息 */
func (r SysUser) Info(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	uid, _ := r.JsonName(json, "uid")
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
	info := map[string]interface{}{
		"nickname":   util.If(util.InKey("nickname", param), util.Trim(param["nickname"]), ""),
		"name":       util.If(util.InKey("name", param), util.Trim(param["name"]), ""),
		"gender":     util.If(util.InKey("gender", param), util.Trim(param["gender"]), ""),
		"birthday":   util.If(util.InKey("birthday", param), util.StrToTime(util.Trim(param["birthday"]), "2006-01-02"), 0),
		"department": util.If(util.InKey("department", param), util.Trim(param["department"]), ""),
		"position":   util.If(util.InKey("position", param), util.Trim(param["position"]), ""),
	}
	// 执行
	m := (&model.UserInfo{}).New()
	m.Set(info)
	m.Where("uid=?", uid)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}
