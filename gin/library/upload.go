package library

import (
	Base64 "encoding/base64"
	"fmt"
	"mime/multipart"
	"regexp"
	"strconv"
	"strings"
	"time"
	"webmis/config"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 上传类 */
type Upload struct{}

/* 单文件 */
func (u Upload) File(c *gin.Context, file *multipart.FileHeader, params map[string]interface{}) string {
	param := map[string]interface{}{
		"path":     "upload/",                                                                //上传目录
		"filename": "",                                                                       //文件名
		"bind":     []string{"svg", "jpg", "jpeg", "png", "gif", "mov", "mp4", "wav", "mp3"}, //后缀
	}
	param = util.ArrayMerge(param, params)
	// 限制格式
	ext := (&FileEo{}).GetExt(file.Filename)
	if param["bind"] != nil {
		if !util.InArray(ext, param["bind"].([]string)) {
			fmt.Println("只支持" + util.Implode(",", param["bind"].([]string)) + "格式!")
			return ""
		}
		fmt.Println(param["bind"], ext, param["path"].(string))
	}
	// 是否重命名
	if param["filename"] == "" {
		param["filename"] = file.Filename
	} else {
		param["filename"] = param["filename"].(string) + "." + ext
	}
	// 创建目录
	(&FileEo{}).New(config.Env().RootDir)
	if !(&FileEo{}).Mkdir(param["path"].(string)) {
		fmt.Println("[Upload] Upload:", "创建目录失败!")
		return ""
	}
	// 保存文件
	if !(&FileEo{}).Upload(c, file, param["path"].(string)+param["filename"].(string)) {
		fmt.Println("[Upload] Mkdir:", "保存文件失败!")
		return ""
	}
	return param["filename"].(string)
}

/* Base64 */
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
	(&FileEo{}).New(config.Env().RootDir)
	if !(&FileEo{}).Mkdir(param["path"].(string)) {
		fmt.Println("[Upload] Mkdir:", "创建目录失败!")
		return ""
	}
	// 文件名
	filename := param["filename"].(string)
	if filename == "" {
		filename = u._getName() + "." + param["ext"].(string)
	}
	byt, _ := Base64.StdEncoding.DecodeString(base64)
	if err := (&FileEo{}).Writer(param["path"].(string)+filename, string(byt)); err != nil {
		fmt.Println("[Upload] Write:", err)
		return ""
	}
	return filename
}

/* 图片回收 */
func (u Upload) HtmlImgClear(html string, dir string) bool {
	// pattern := "<img.*?src=[\\'|\"](.*?)[\\'|\"].*?[\\/]?>"
	pattern := regexp.MustCompile(`<img.*?src=[\'|\"](.*?)[\'|\"].*?[\/]?>`)
	match := pattern.FindAllStringSubmatch(html, -1)
	imgs := []string{}
	for i := range match {
		src := match[i][1]
		index := strings.LastIndex(src, "/")
		imgs = append(imgs, src[index+1:])
	}
	// 清理图片
	(&FileEo{}).New(config.Env().RootDir)
	all := (&FileEo{}).AllFile(dir)
	for _, val := range all {
		if !util.InArray(val, imgs) {
			(&FileEo{}).RemoveAll(dir + val)
		}
	}
	return true
}

// 获取名称
func (u Upload) _getName() string {
	d := time.Now().Format("20060102150405")
	t := strconv.FormatInt(time.Now().UnixNano(), 10)
	n := t[len(t)-4:]
	return d + n
}
