package admin

import (
	"webmis/config"
	"webmis/library"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

var ImgDir string = "upload/news/"

type WebNews struct {
	service.Base
}

/* 列表 */
func (r WebNews) List(c *gin.Context) {
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
	title := util.Trim(util.If(util.InKey("title", param), param["title"], ""))
	// 统计
	m := (&model.WebNews{}).New()
	m.Columns("count(*) AS num")
	m.Where("title LIKE ?", "%"+title+"%")
	total := m.FindFirst()
	// 查询
	m.Columns("id", "cid", "title", "source", "author", "FROM_UNIXTIME(ctime, '%Y-%m-%d %H:%i:%s') as ctime", "FROM_UNIXTIME(utime, '%Y-%m-%d %H:%i:%s') as utime", "state", "img", "summary")
	m.Where("title LIKE ?", "%"+title+"%")
	m.Page((&util.Type{}).Int(page), (&util.Type{}).Int(limit))
	m.Order("id DESC")
	list := m.Find()
	// 数据
	for _, v := range list {
		v["img"] = (&service.Data{}).Img(v["img"])
		if (&util.Type{}).Strval(v["state"]) == "1" {
			v["state"] = true
		} else {
			v["state"] = false
		}
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list, "total": (&util.Type{}).Int(total["num"])})
}

/* 添加 */
func (r WebNews) Add(c *gin.Context) {
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
	base64 := util.Trim(util.If(util.InKey("img", param), param["img"], ""))
	cid := util.Trim(util.If(util.InKey("cid", param), param["cid"], ""))
	title := util.Trim(util.If(util.InKey("title", param), param["title"], ""))
	source := util.Trim(util.If(util.InKey("source", param), param["source"], ""))
	author := util.Trim(util.If(util.InKey("author", param), param["author"], ""))
	summary := util.Trim(util.If(util.InKey("summary", param), param["summary"], ""))
	if base64 == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "请上传封面图!"})
		return
	}
	if cid == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "请选择分类!"})
		return
	}
	if util.Len(title) < 2 || util.Len(title) > 30 {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "新闻标题2～30字符!"})
		return
	}
	// 封面图
	path := ImgDir + "img/"
	img := (&library.Upload{}).Base64(map[string]interface{}{"path": path, "base64": base64})
	// 模型
	db := (&model.WebNews{}).New()
	conn := db.DBConn()
	tx, _ := conn.Begin()
	// 信息
	m1 := (&model.WebNews{}).New()
	m1.Values(map[string]interface{}{"cid": cid, "title": title, "source": source, "author": author, "summary": summary, "ctime": util.Time(), "utime": util.Time(), "img": path + img})
	sql, args := m1.InsertSQL()
	rs, err1 := tx.Exec(sql, args...)
	id := db.LastInsertId(rs)
	// 内容
	m2 := (&model.WebNewsHtml{}).New()
	m2.Values(map[string]interface{}{"nid": id})
	sql, args = m2.InsertSQL()
	_, err2 := tx.Exec(sql, args...)
	if err1 != nil || err2 != nil {
		tx.Rollback()
		(&library.FileEo{}).New(config.Env().RootDir)
		(&library.FileEo{}).RemoveAll(path + img)
		r.GetJSON(c, gin.H{"code": 5000, "msg": "添加失败!"})
	} else {
		tx.Commit()
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	}
}

/* 编辑 */
func (r WebNews) Edit(c *gin.Context) {
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
	base64 := util.Trim(util.If(util.InKey("img", param), param["img"], ""))
	cid := util.Trim(util.If(util.InKey("cid", param), param["cid"], ""))
	title := util.Trim(util.If(util.InKey("title", param), param["title"], ""))
	source := util.Trim(util.If(util.InKey("source", param), param["source"], ""))
	author := util.Trim(util.If(util.InKey("author", param), param["author"], ""))
	summary := util.Trim(util.If(util.InKey("summary", param), param["summary"], ""))
	if base64 == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "请上传封面图!"})
		return
	}
	if cid == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "请选择分类!"})
		return
	}
	if util.Len(title) < 2 || util.Len(title) > 30 {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "新闻标题2～30字符!"})
		return
	}
	// 封面图
	img := ""
	path := ImgDir + "img/"
	(&library.FileEo{}).New(config.Env().RootDir)
	if base64[0:4] != "http" {
		img = (&library.Upload{}).Base64(map[string]interface{}{"path": path, "base64": base64})
		// 清理封面
		m1 := (&model.WebNews{}).New()
		m1.Columns("img")
		m1.Where("id=?", id)
		tmp := m1.FindFirst()
		(&library.FileEo{}).RemoveAll(tmp["img"].(string))
	}
	// 模型
	m := (&model.WebNews{}).New()
	sData := map[string]interface{}{"cid": cid, "title": title, "source": source, "author": author, "summary": summary, "utime": util.Time()}
	if img != "" {
		sData["img"] = path + img
	}
	m.Set(sData)
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		if img != "" {
			(&library.FileEo{}).RemoveAll(path + img)
		}
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 删除 */
func (r WebNews) Del(c *gin.Context) {
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
	// 封面图
	m := (&model.WebNews{}).New()
	m.Columns("id", "img")
	m.Where("id in(" + ids + ")")
	imgList := m.Find()
	// 模型
	db := (&model.WebNews{}).New()
	conn := db.DBConn()
	tx, _ := conn.Begin()
	// 信息
	m1 := (&model.WebNews{}).New()
	m1.Where("id in(" + ids + ")")
	sql, args := m1.DeleteSQL()
	_, err1 := tx.Exec(sql, args...)
	// 内容
	m2 := (&model.WebNewsHtml{}).New()
	m2.Where("nid in(" + ids + ")")
	sql, args = m2.DeleteSQL()
	_, err2 := tx.Exec(sql, args...)
	if err1 != nil || err2 != nil {
		tx.Rollback()
		r.GetJSON(c, gin.H{"code": 5000, "msg": "添加失败!"})
	} else {
		tx.Commit()
		// 清理图片
		(&library.FileEo{}).New(config.Env().RootDir)
		for _, v := range imgList {
			(&library.FileEo{}).RemoveAll(v["img"].(string))
			(&library.FileEo{}).RemoveAll(ImgDir + v["id"].(string) + "/")
		}
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	}
}

/* 权限 */
func (r WebNews) State(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	id, _ := r.JsonName(json, "id")
	state, _ := r.JsonName(json, "state")
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
	m := (&model.WebNews{}).New()
	m.Set(map[string]interface{}{"state": util.If((&util.Type{}).Bool(state), "1", "0"), "utime": util.Time()})
	m.Where("id=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 分类-获取 */
func (r WebNews) GetClass(c *gin.Context) {
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
	// 查询
	m := (&model.WebNewsClass{}).New()
	m.Columns("id", "name")
	m.Where("state=?", "1")
	m.Order("sort DESC")
	list := m.Find()
	// 数据
	data := []map[string]interface{}{}
	for _, v := range list {
		data = append(data, map[string]interface{}{"label": v["name"], "value": v["id"]})
	}
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "data": data})
}

/* 内容-获取 */
func (r WebNews) GetContent(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	nid, _ := r.JsonName(json, "id")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 查询
	m := (&model.WebNewsHtml{}).New()
	m.Columns("content")
	m.Where("nid=?", nid)
	data := m.FindFirst()
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "content": data["content"]})
}

/* 内容-修改 */
func (r WebNews) Content(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	data, _ := r.JsonName(json, "data")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
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
	id := util.Trim(util.If(util.InKey("id", param), param["id"], ""))
	content := util.Trim(util.If(util.InKey("content", param), param["content"], ""))
	// 图片回收
	(&library.Upload{}).HtmlImgClear(content, ImgDir+id+"/")
	// 模型
	m := (&model.WebNewsHtml{}).New()
	m.Set(map[string]interface{}{"content": content})
	m.Where("nid=?", id)
	if m.Update() {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}

/* 内容-图片 */
func (r WebNews) UpImg(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	base64, _ := r.JsonName(json, "base64")
	id, _ := r.JsonName(json, "id")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if util.Empty(base64) {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 上传
	path := ImgDir + id + "/"
	img := (&library.Upload{}).Base64(map[string]interface{}{"path": path, "base64": base64})
	if img != "" {
		r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "img": (&service.Data{}).Img(path + img)})
	} else {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "更新失败!"})
	}
}
