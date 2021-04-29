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
	uname := util.Trim(util.If(util.InKey("uname", param), param["uname"], ""))
	// 统计
	m := (&model.User{}).New()
	m.Columns("count(*) AS num")
	m.Where("uname LIKE ? OR tel LIKE ? OR email LIKE ?", "%"+uname+"%", "%"+uname+"%", "%"+uname+"%")
	total := m.FindFirst()
	// 查询
	m.Table("user as a")
	m.LeftJoin("user_info as b", "a.id=b.uid")
	m.LeftJoin("sys_perm as c", "a.id=c.uid")
	m.LeftJoin("api_perm as d", "a.id=d.uid")
	m.Columns(
		"a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
		"b.nickname", "b.position", "b.name", "b.gender", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday", "b.img",
		"c.role AS sys_role", "c.perm AS sys_perm",
		"d.role AS api_role", "d.perm AS api_perm",
	)
	m.Where("a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?", "%"+uname+"%", "%"+uname+"%", "%"+uname+"%")
	m.Order("a.id DESC")
	m.Page(util.Int(page), util.Int(limit))
	list := m.Find()
	// 状态
	for _, val := range list {
		if util.Strval(val["state"]) == "1" {
			val["state"] = true
		} else {
			val["state"] = false
		}
		val["img"] = (&service.Data{}).Img(val["img"])
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list, "total": util.Int(total["num"])})
}

/* 添加 */
func (r SysUser) Add(c *gin.Context) {
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
	uid := (&service.Data{}).GetId("ID")
	conn := m.DBConn()
	tx, _ := conn.Begin()
	// 用户
	m1 := (&model.User{}).New()
	m1.Values(map[string]interface{}{"id": uid, "tel": tel, "password": util.Md5(passwd)})
	sql, args := m1.InsertSQL()
	_, err1 := tx.Exec(sql, args...)
	// 详情
	m2 := (&model.UserInfo{}).New()
	m2.Values(map[string]interface{}{"uid": uid})
	sql, args = m2.InsertSQL()
	_, err2 := tx.Exec(sql, args...)
	// 权限
	m3 := (&model.ApiPerm{}).New()
	m3.Values(map[string]interface{}{"uid": uid, "role": 1, "utime": util.Time()})
	sql, args = m3.InsertSQL()
	_, err3 := tx.Exec(sql, args...)
	if err1 != nil || err2 != nil || err3 != nil {
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
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	uid := c.PostForm("uid")
	data := c.PostForm("data")
	if util.Empty(uid) || util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
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
	if !util.Empty(user) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "该用户已存在!"})
		return
	}
	// 更新
	uData := map[string]interface{}{"tel": tel}
	if passwd != "" {
		uData["password"] = util.Md5(passwd)
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
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	uid := c.PostForm("uid")
	state := c.PostForm("state")
	if state == "1" {
		state = "1"
	} else {
		state = "0"
	}
	if util.Empty(uid) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 更新
	m := (&model.User{}).New()
	m.Set(map[string]interface{}{"state": state})
	m.Where("id=?", uid)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 个人信息 */
func (r SysUser) Info(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	uid := c.PostForm("uid")
	data := c.PostForm("data")
	if util.Empty(data) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	param := map[string]interface{}{}
	util.JsonDecode(data, &param)
	info := map[string]interface{}{
		"nickname": util.If(util.InKey("nickname", param), util.Trim(param["nickname"]), ""),
		"name":     util.If(util.InKey("name", param), util.Trim(param["name"]), ""),
		"gender":   util.If(util.InKey("gender", param), util.Trim(param["gender"]), ""),
		"birthday": util.If(util.InKey("birthday", param), util.Strtotime(util.Trim(param["birthday"]), "2006-01-02"), 0),
		"position": util.If(util.InKey("position", param), util.Trim(param["position"]), ""),
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
