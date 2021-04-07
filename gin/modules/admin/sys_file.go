package admin

import (
	"webmis/config"
	"webmis/library"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

var dirRoot = "upload/"

/* 文件类 */
type SysFile struct {
	service.Base
}

/* 列表 */
func (r SysFile) List(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	path := c.PostForm("path")
	if path == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	(&library.FileEo{}).New(config.Env().RootDir + dirRoot)
	list := (&library.FileEo{}).List(path)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "url": config.Env().BaseURL + dirRoot, "data": list})
}

/* 新建文件夹 */
func (r SysFile) Mkdir(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	path := c.PostForm("path")
	name := c.PostForm("name")
	if path == "" || name == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	(&library.FileEo{}).New(config.Env().RootDir + dirRoot)
	if !(&library.FileEo{}).Mkdir(path + name) {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "新建文件夹失败!"})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
}

/* 重命名 */
func (r SysFile) Rename(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	path := c.PostForm("path")
	rename := c.PostForm("rename")
	name := c.PostForm("name")
	if path == "" || rename == "" || name == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	(&library.FileEo{}).New(config.Env().RootDir + dirRoot)
	if !(&library.FileEo{}).Rename(path+rename, path+name) {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "重命名失败!"})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
}

/* 上传 */
func (r SysFile) Upload(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	path := c.PostForm("path")
	if path == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	file, _ := c.FormFile("up")
	img := (&library.Upload{}).File(c, file, map[string]interface{}{"path": dirRoot + path, "bind": nil})
	if img == "" {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "上传失败!"})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
}

/* 下载 */
func (r SysFile) Down(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	path := c.PostForm("path")
	filename := c.PostForm("filename")
	if path == "" || filename == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 返回
	c.Writer.Write((&library.FileEo{}).Bytes(path + filename))
}

/* 删除 */
func (r SysFile) Remove(c *gin.Context) {
	// 验证
	token := c.PostForm("token")
	msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 参数
	path := c.PostForm("path")
	data := c.PostForm("data")
	if path == "" || data == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 数据
	(&library.FileEo{}).New(config.Env().RootDir + dirRoot)
	files := []interface{}{}
	util.JsonDecode(data, &files)
	for _, val := range files {
		(&library.FileEo{}).RemoveAll(path + util.Strval(val))
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功"})
}
