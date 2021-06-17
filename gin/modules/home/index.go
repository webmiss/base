package home

import (
	"webmis/config"
	"webmis/library"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* Web */
type Index struct {
	service.Base
}

/* 首页 */
func (r Index) Index(c *gin.Context) {
	oss := (&library.Upload{}).OssPolicy("jpg", 0)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Web", "oss": oss})
}

/* 验证码 */
func (r Index) Vcode(c *gin.Context) {
	(&library.Captcha{}).Vcode()
	// 返回
	r.GetJSON(c, "")
}

/* 二维码 */
func (r Index) Qrcode(c *gin.Context) {
	name := c.Param("name")
	var text string
	if name == "docs" {
		text = "https://webmis.vip/"
	} else if name == "demo" {
		text = "https://demo-app.webmis.vip/"
	} else if name == "wechat" {
		text = "http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK"
	} else if name == "server1" {
		text = "https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So"
	} else if name == "server2" {
		text = "https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo"
	}
	// 创建目录
	path := "upload/qrcode/"
	(&library.FileEo{}).New(config.Env().RootDir)
	if !(&library.FileEo{}).Mkdir(path) {
		return
	}
	// 是否生成
	file := path + name + ".png"
	if !(&library.FileEo{}).IsFile(file) {
		ct := (&library.Qrcode{}).Create(map[string]interface{}{"text": text})
		(&library.FileEo{}).Writer(file, string(ct))
	}
	// 返回
	img := (&library.FileEo{}).Bytes(file)
	c.Writer.WriteString(string(img))
}

/* OSS-上传回调 */
func (r Index) OssCallback(c *gin.Context) {
	// 参数
	param := map[string]interface{}{}
	c.BindJSON(&param)
	// 验证
	if !(&library.Upload{}).OssPolicyVerify(param) {
		return
	}
	// 数据处理: public/upload/callback.txt
	r.TmpCallback(string(util.JsonEncode(param)))
	// 返回
	c.JSON(200, gin.H{"Status": "Ok"})
}
