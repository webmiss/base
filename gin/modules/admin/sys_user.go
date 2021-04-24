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
	param := map[string]string{}
	util.JsonDecode(data, &param)
	var uname string
	if val, ok := param["uname"]; ok {
		uname = val
	}
	// 统计
	model := (&model.User{}).New()
	model.Columns("count(*) AS num")
	total := model.FindFirst()
	// 查询
	model.Table("user as a")
	model.LeftJoin("user_info as b", "a.id=b.uid")
	model.LeftJoin("sys_perm as c", "a.id=c.uid")
	model.Columns(
		"a.id AS uid", "a.uname", "a.email", "a.tel", "a.state", "FROM_UNIXTIME(a.rtime, '%Y-%m-%d %H:%i:%s') as rtime", "FROM_UNIXTIME(a.ltime, '%Y-%m-%d %H:%i:%s') as ltime", "FROM_UNIXTIME(a.utime, '%Y-%m-%d %H:%i:%s') as utime",
		"b.nickname", "b.position", "b.name", "b.gender", "FROM_UNIXTIME(b.birthday, '%Y-%m-%d') as birthday", "b.img",
		"c.role", "c.perm",
	)
	model.Where("a.uname LIKE ? OR a.tel LIKE ? OR a.email LIKE ?", "%"+uname+"%", "%"+uname+"%", "%"+uname+"%")
	model.Order("a.id DESC")
	model.Page(util.Int(page), util.Int(limit))
	list := model.Find()
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
	param := map[string]string{}
	util.JsonDecode(data, &param)
	var tel string
	if val, ok := param["tel"]; ok {
		tel = val
	}
	passwd := config.Env().Password
	if val, ok := param["passwd"]; ok {
		passwd = val
	}
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
