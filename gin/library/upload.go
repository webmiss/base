package library

import (
	"crypto/rand"
	Base64 "encoding/base64"
	"fmt"
	"math/big"
	"mime/multipart"
	"regexp"
	"strconv"
	"strings"
	"time"
	"webmis/config"
	"webmis/library/aliyun"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* 上传类 */
type Upload struct{}

// 机器标识
var machineId string = (&util.Type{}).Strval(config.Env().MachineId)

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
	ct := util.Explode(",", base64)
	if len(ct) > 1 {
		param["ext"] = (&util.Base64{}).GetExt(ct[0])
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
		filename = u.GetFileName() + "." + param["ext"].(string)
	}
	byt, _ := Base64.StdEncoding.DecodeString(base64)
	if err := (&FileEo{}).Writer(param["path"].(string)+filename, string(byt)); err != nil {
		fmt.Println("[Upload] Write:", err)
		return ""
	}
	return filename
}

/* OSS-签名直传 */
func (u Upload) OssPolicy(ext string, expireTime int64) map[string]interface{} {
	// 类型
	extImg := []string{"jpg", "png", "gif"}
	extVod := []string{"mp4"}
	// 目录
	dir := "tmp/"
	if util.InArray(ext, extImg) {
		dir = "img/"
	} else if util.InArray(ext, extVod) {
		dir = "vod/"
	}
	// 文件名
	file := u.GetFileName()
	if ext != "" {
		file += "." + ext
	}
	return (&aliyun.Oss{}).Policy(dir, file, expireTime, 0)
}

/* 图片回收 */
func (u Upload) HtmlImgClear(html string, dir string) bool {
	// 全部图片
	imgs := u.GetHtmlFile(html)
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

/* 文件名-生成 */
func (Upload) GetFileName() string {
	// 时间
	d := time.Now().Format("20060102150405")
	t := strconv.FormatInt(time.Now().UnixNano()/1e6, 10)
	n := t[len(t)-3:]
	// 随机数
	randA, _ := rand.Int(rand.Reader, big.NewInt(255))
	randB, _ := rand.Int(rand.Reader, big.NewInt(255))
	return d + n + machineId + randA.String() + randB.String()
}

/* 图片地址-获取HTML */
func (Upload) GetHtmlFile(html string) []string {
	pattern := regexp.MustCompile(`<img.*?src=[\'|\"](.*?)[\'|\"].*?[\/]?>`)
	match := pattern.FindAllStringSubmatch(html, -1)
	imgs := []string{}
	for i := range match {
		src := match[i][1]
		index := strings.LastIndex(src, "/")
		imgs = append(imgs, src[index+1:])
	}
	return imgs
}
