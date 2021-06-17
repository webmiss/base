package aliyun

import (
	"bytes"
	"fmt"
	"webmis/config"
	"webmis/util"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
)

/* 对象存储 */
type Oss struct {
	Signature
	OssConn         *oss.Bucket //连接
	AccessKeyId     string      //RAM: AccessKeyId
	AccessKeySecret string      //RAM: AccessKeySecret
	Endpoint        string      //地域节点
	Bucket          string      //Bucket名称
}

/* 签名直传-参数 */
func (o *Oss) Policy(dir string, file string, expireTime int64, maxSize int64) map[string]interface{} {
	ram := config.RAM()
	cfg := config.OSS()
	// 默认值
	if expireTime == 0 {
		expireTime = cfg.ExpireTime
	}
	if maxSize == 0 {
		maxSize = cfg.MaxSize
	}
	// 数据
	res := o.PolicySign(expireTime, maxSize)
	res["host"] = "https://" + cfg.Bucket + "." + cfg.Endpoint
	res["dir"] = dir
	res["file"] = file
	res["max_size"] = maxSize
	// 回调
	callbackBody := string(util.JsonEncode(map[string]interface{}{
		"dir":    dir,
		"file":   file,
		"expire": (&util.Type{}).Strval(res["expire"]),
		"sign":   (&util.Hash{}).Md5(dir + "&" + file + "&" + (&util.Type{}).Strval(res["expire"]) + "&" + ram.AccessKeySecret),
	}))
	callbackData := map[string]string{
		"callbackUrl":      cfg.CallbackUrl,
		"callbackBodyType": cfg.CallbackType,
		"callbackBody":     callbackBody,
	}
	res["callback"] = (&util.Base64{}).Encode(util.JsonEncode(callbackData))
	return res
}

/* 签名直传-验证 */
func (Oss) PolicyVerify(dir string, file string, expire string, sign string) bool {
	// 配置
	ram := config.RAM()
	// 验证
	signTmp := (&util.Hash{}).Md5(dir + "&" + file + "&" + expire + "&" + ram.AccessKeySecret)
	if sign != signTmp {
		return false
	}
	// 是否超时
	now := util.Time()
	etime := (&util.Type{}).Int64(expire)
	if now > etime {
		return false
	}
	return true
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
