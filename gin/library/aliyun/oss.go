package aliyun

import (
	"bytes"
	"crypto/rand"
	"fmt"
	"math/big"
	"regexp"
	"strconv"
	"strings"
	"time"
	"webmis/config"
	"webmis/util"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
)

/* 对象存储 */
type Oss struct {
	OssConn         *oss.Bucket //连接
	AccessKeyId     string      //RAM: AccessKeyId
	AccessKeySecret string      //RAM: AccessKeySecret
	Endpoint        string      //地域节点
	Bucket          string      //Bucket名称
}

/* 初始化 */
func (o *Oss) Init() *oss.Bucket {
	// 配置
	ramCfg := config.RAM()
	ossCfg := config.OSS()
	if o.AccessKeyId == "" {
		o.AccessKeyId = ramCfg.AccessKeyId
	}
	if o.AccessKeySecret == "" {
		o.AccessKeySecret = ramCfg.AccessKeySecret
	}
	if o.Endpoint == "" {
		o.Endpoint = ossCfg.Endpoint
	}
	if o.Bucket == "" {
		o.Bucket = ossCfg.Bucket
	}
	// 连接
	if o.OssConn == nil {
		client, err := oss.New(o.Endpoint, o.AccessKeyId, o.AccessKeySecret)
		if err != nil {
			fmt.Println("[OSS] Conn:", err)
			return nil
		}
		bucket, err := client.Bucket(o.Bucket)
		if err != nil {
			fmt.Println("[OSS] Conn:", err)
			return nil
		}
		o.OssConn = bucket
	}
	return o.OssConn
}

/* 列表 */
func (o Oss) ListObject(path string) map[string][]string {
	res := map[string][]string{}
	folder := []string{}
	file := []string{}
	res["folder"] = folder
	res["file"] = file
	fmt.Println(res)
	// 连接
	conn := o.Init()
	if conn == nil {
		return res
	}
	// 数据
	lsRes, err := conn.ListObjects(oss.Prefix(path), oss.Delimiter("/"))
	if err != nil {
		fmt.Println("[OSS] List:", err)
		return res
	}
	// 文件夹
	for _, val := range lsRes.CommonPrefixes {
		folder = append(folder, val)
	}
	// 文件
	for _, val := range lsRes.Objects {
		file = append(file, val.Key)
	}
	res["folder"] = folder
	res["file"] = file
	return res
}

/* 上传 */
func (o Oss) PutObject(file string, content []byte) bool {
	// 连接
	conn := o.Init()
	if conn == nil {
		return false
	}
	// 执行
	err := conn.PutObject(file, bytes.NewBuffer(content))
	if err != nil {
		fmt.Println("[OSS] Put:", err)
		return false
	}
	return true
}

/* 删除-单个 */
func (o Oss) DeleteObject(file string) bool {
	if len(file) == 0 {
		return false
	}
	// 连接
	conn := o.Init()
	if conn == nil {
		return false
	}
	// 执行
	err := conn.DeleteObject(file)
	if err != nil {
		fmt.Println("[OSS] Del:", err)
		return false
	}
	return true
}

/* 删除-多个 */
func (o Oss) DeleteObjects(files []string) bool {
	if len(files) == 0 {
		return false
	}
	// 连接
	conn := o.Init()
	if conn == nil {
		return false
	}
	// 执行
	delRes, err := conn.DeleteObjects(files)
	if err != nil {
		fmt.Println("[OSS] Dels:", delRes.DeletedObjects)
		return false
	}
	return true
}

/* 删除-文件夹&文件 */
func (o Oss) DeleteObjectAll(path string) bool {
	if len(path) == 0 {
		return false
	}
	// 连接
	conn := o.Init()
	if conn == nil {
		return false
	}
	// 文件
	last := path[len(path)-1:]
	if last != "/" {
		err := conn.DeleteObject(path)
		if err != nil {
			fmt.Println("[OSS] DelAll:", err)
			return false
		}
		return true
	}
	// 文件夹
	marker := oss.Marker("")
	prefix := oss.Prefix(path)
	// 列表
	lor, err := conn.ListObjects(marker, prefix)
	if err != nil {
		fmt.Println("[OSS] DelAll:", err)
		return false
	}
	// 全部对象
	objects := []string{}
	for _, object := range lor.Objects {
		objects = append(objects, object.Key)
	}
	// 执行
	return o.DeleteObjects(objects)
}

/* 生成文件名 */
func (Oss) GetFileName() string {
	d := time.Now().Format("20060102150405")
	t := strconv.FormatInt(time.Now().UnixNano()/1e6, 10)
	n := t[len(t)-3:]
	// 随机数
	rand, _ := rand.Int(rand.Reader, big.NewInt(255))
	return d + n + rand.String()
}

/* 获取HTML文件名 */
func (Oss) GetHtmlFile(html string) []string {
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

/* 清除HTML图片 */
func (o Oss) HtmlFileClear(path string, html string) bool {
	all := o.ListObject(path)
	imgs := o.GetHtmlFile(html)
	objects := []string{}
	for _, val := range all["file"] {
		if !util.InArray(val, imgs) {
			objects = append(objects, path+val)
		}
	}
	if len(objects) > 0 {
		return o.DeleteObjects(objects)
	}
	return true
}

/* 上传Base64 */
func (o Oss) UploadBase64(path string, base64 string) string {
	if path == "" || base64 == "" {
		return ""
	}
	// 后缀
	ext := ""
	ct := util.Explode(",", base64)
	if len(ct) > 1 {
		ext = (&util.Base64{}).GetExt(ct[0])
		base64 = ct[1]
	}
	// 文件
	file := path + o.GetFileName()
	if ext != "" {
		file += "." + ext
	}
	// 保存
	res := o.PutObject(file, (&util.Base64{}).Decode(base64))
	if res {
		return file
	}
	return ""
}
