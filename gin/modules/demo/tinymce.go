package demo

import (
	"webmis/library"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* TinyMCE编辑器 */
type Tinymce struct {
	service.Base
}

/* 编辑 */
func (r Tinymce) Edit(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	content, _ := r.JsonName(json, "content")
	content = (&util.Url{}).Decode(content)
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	// 图片回收
	ImgDir := "upload/tinymce/"
	(&library.Upload{}).HtmlImgClear(content, ImgDir)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "content": (&util.Url{}).Encode(content)})
}

/* 图片 */
func (r Tinymce) UpImg(c *gin.Context) {
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	base64, _ := r.JsonName(json, "base64")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}
	if base64 == "" {
		r.GetJSON(c, gin.H{"code": 4000, "msg": "参数错误!"})
		return
	}
	// 上传
	ImgDir := "upload/tinymce/"
	img := (&library.Upload{}).Base64(map[string]interface{}{"path": ImgDir, "base64": base64})
	if img == "" {
		r.GetJSON(c, gin.H{"code": 5000, "msg": "上传失败!"})
		return
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "img": (&service.Data{}).Img(ImgDir + img)})
}
