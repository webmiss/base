package library

import (
	Base64 "encoding/base64"
	"fmt"
	"strconv"
	"strings"
	"time"
	"webmis/config"
	"webmis/util"
)

// Upload :上传类
type Upload struct{}

// Base64 :Base64
func (u Upload) Base64(params map[string]interface{}) string {
	param := map[string]interface{}{
		"param":    "upload/", //上传目录
		"base64":   "",        //文件内容
		"filename": "",        //文件名
		"ext":      "png",     //后缀
	}
	param = util.ArrayMerge(param, params)
	// 内容
	base64 := param["base64"].(string)
	ct := strings.Split(base64, ",")
	if len(ct) > 1 {
		if ct[0] == "data:image/jpeg;base64" {
			param["ext"] = "jpg"
		} else if ct[0] == "data:image/png;base64" {
			param["ext"] = "png"
		} else if ct[0] == "data:image/gif;base64" {
			param["ext"] = "gif"
		}
		base64 = ct[1]
	}
	// 创建目录
	(&FilesEo{}).New(config.Env().RootDir)
	if err := (&FilesEo{}).Mkdir(param["path"].(string)); err != nil {
		fmt.Println("[Upload] Mkdir:", err)
		return ""
	}
	// 文件名
	filename := param["filename"].(string)
	if filename == "" {
		filename = u._getName() + "." + param["ext"].(string)
	}
	byt, _ := Base64.StdEncoding.DecodeString(base64)
	if err := (&FilesEo{}).Writer(param["path"].(string)+filename, string(byt)); err != nil {
		fmt.Println("[Upload] Write:", err)
		return ""
	}
	return filename
}

// 获取名称
func (u Upload) _getName() string {
	d := time.Now().Format("20060102150405")
	t := strconv.FormatInt(time.Now().UnixNano(), 10)
	n := t[len(t)-4:]
	return d + n
}
