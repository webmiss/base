package home

import (
	"fmt"
	"io/ioutil"
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
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Web"})
}

func (r Index) UpFileCallback(c *gin.Context) {
	// 参数
	// publicKeyUrlBase64 := c.Request.Header.Get("x-oss-pub-key-url")
	// authorizationBase64 := c.Request.Header.Get("authorization")
	bodyContent, _ := ioutil.ReadAll(c.Request.Body)
	callbackBody := string(bodyContent)
	// 验证
	// publicKeyUrlBase64 = "aHR0cHM6Ly9nb3NzcHVibGljLmFsaWNkbi5jb20vY2FsbGJhY2tfcHViX2tleV92MS5wZW0="
	// authorizationBase64 = "lRwZVdeqeee91Ma6k+Wafk0dRw8HfMJOJLQEom8eLW4CZbk89I+8dQfhgQLbbYbZAlnBSMobnt3BmT8KLfKonA=="
	// callbackBody = `{"dir":"img/","file":"20210617101029468110173.jpg"}`
	// (&aliyun.Signature{}).VerifySignature(publicKeyUrlBase64, authorizationBase64, callbackBody)
	// 数据
	data := map[string]interface{}{}
	util.JsonDecode(callbackBody, &data)
	fmt.Println(callbackBody)
	fmt.Println(data)
	json := map[string]interface{}{}
	c.Bind(&json)
	fmt.Println(data)
	// text := string(util.JsonEncode(map[string]interface{}{
	// 	"dir":  c.PostForm("dir"),
	// 	"file": c.PostForm("file"),
	// }))
	// // 写入文件
	// cmd := exec.Command("/bin/bash", "-c", "echo "+text+" > public/upload/callback.txt")
	// cmd.Run()
	// fmt.Println(text)
	// 返回
	c.JSON(200, gin.H{"Status": "Ok"})
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
