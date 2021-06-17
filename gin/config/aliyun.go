package config

/* 腾讯云配置 */
type (
	RamType struct {
		AccessKeyId     string
		AccessKeySecret string
	}
	OssType struct {
		Endpoint     string
		Bucket       string
		MaxSize      int64
		ExpireTime   int64
		CallbackUrl  string
		CallbackType string
		ImgUrl       string
	}
)

/* RAM访问控制 */
func RAM() *RamType {
	cfg := &RamType{}
	cfg.AccessKeyId = "LTAI5tBxpsyAoe2EV1goV8wW"
	cfg.AccessKeySecret = "FhMQw6WRyZbMAsTc9jrlCw4efYh2Qx"
	return cfg
}

/* 对象存储 */
func OSS() *OssType {
	cfg := &OssType{}
	cfg.Endpoint = "oss-cn-chengdu.aliyuncs.com"               //区域
	cfg.Bucket = "webmis-upload"                               //存储空间
	cfg.MaxSize = 100 * 1024 * 1024                            //最大文件
	cfg.ExpireTime = 30                                        //签名有效时间(秒)
	cfg.CallbackUrl = "https://demo-go.webmis.vip/ossCallback" //回调URL
	cfg.CallbackType = "application/json"                      //回调数据类型
	cfg.ImgUrl = "http://img.webmis.vip/"                      //图片域名
	return cfg
}
