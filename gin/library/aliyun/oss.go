package aliyun

import (
	"bytes"
	"fmt"
	"webmis/config"

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
	cfg := config.RAM()
	if o.AccessKeyId == "" {
		o.AccessKeyId = cfg.AccessKeyId
	}
	if o.AccessKeySecret == "" {
		o.AccessKeySecret = cfg.AccessKeySecret
	}
	if o.Endpoint == "" {
		o.Endpoint = cfg.Endpoint
	}
	if o.Bucket == "" {
		o.Bucket = cfg.Bucket
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

/* 上传 */
func (o Oss) PutObject(object string, content []byte) bool {
	conn := o.Init()
	if conn == nil {
		return false
	}
	err := conn.PutObject(object, bytes.NewBuffer(content))
	if err != nil {
		return false
	}
	return true
}
