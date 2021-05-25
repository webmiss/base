package home

import (
	"webmis/config"
	"webmis/library"
	"webmis/library/aliyun"
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
	object := "mytest/go.png"
	content := "iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAA9aVRYdENyZWF0aW9uIFRpbWUAAAAAADIwMjHlubQwNeaciDI05pelIOaYn+acn+S4gCAxN+aXtjQy5YiGMDjnp5IIYwcbAAADP0lEQVQ4jXWTu29cVRDGf3PO2fXu9d7NxvE7sYnZKMQExRQk6cApI1AqhJQGiYJ0/A00iJaakgIkHhKPAilFIoRIkCMSCWTsyNhOsPMgfqxj7+Pu7r3nDMXaQSkYaaQZab4ZfTPfyO5HZxSfosYCQm2nzWYXfOSotTwlB0UvjPRBpezAWshSRAwYi2YpDlVQaCWe1a4w+kaZmek++iIBBYCkEVif7zL/a5NqBEWnIAoagIDsfvyq7u11+Dt2nH2nRL5geIZ+zoR2K3D76zpTLaUUWTAGzVJMlgXuaeD85Zh8Qf6nQc8KkXDucpkVHwg+gCqiilnb6vLSpQqPVlLmfmyCSA+hsh/vu8DN7xs8Xu1y4mLMw60OBI8Gj2vGhsOuS/KkTvloERT2aoGNtZSn/wSOncqhCmNTOU5PeeTJDoVqzL2iZcLmEMD0jwuapLhuRtQXACgPWHZWHbn5Myxf62N40vXoGHBpgKC4IUvwCqo449vkqyPkq4ee4z/8omNv3TJUFawTuonyx2NHLlcmLAt0ugQPEjJc42GKNhIkjkAPlipMzij1YwvEAwYQth+n5LKEuGTYfODZXe3gTsSQCSZKSjz4bZvQaB3gAUUEyoMGsb187HiexBdodoskGwlHS9F+veCmBoXFn4VWfZORkxG1JGJoso94wO5fCVClVWuzsQLtRspwM89EVSDroD7Fic1jbYlb1wtMthJmZvP8dbvJcH+duGLQoNRrGYt3hph98xJPHz1h5+YNxDkQiyA4r9AoDvLWBxdZmLvK3WvbeG9Yqp+iXOnHZ4GdWsJrF6aJz17B/v4Z93+ae6YdBJwNKX6vTmnsJOfffoWwfp3gPcaa/8QrIAhh6StcSAhBwaegBw9oHUdcg7VfvmOiOgiqGGOeV7+Comj9IZoFMjWodYhYsAGDCM3UUK4U0aBsbbRIU9+bLtJTvsL2VkK3k+JyhsLYKEmndxkRg9EsI3ExlSMRjXqHbz//k/X7DWTkHM3K62Sjs7Q4zA9f3mV5cQNQxqtDbG4l4DPUZ7h2ZuifvoA9/S6HUd5/+T42HuXG1QVuffMFgnDl009478Pj2EMTSGGAkfE97swt8YK0QYR/ATsNfzHf0tKvAAAAAElFTkSuQmCC"
	res := (&aliyun.Oss{}).PutObject(object, (&util.Base64{}).Decode(content))
	print(res)
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Web"})
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
