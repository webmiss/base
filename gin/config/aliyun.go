package config

/* 腾讯云配置 */
type RamType struct {
	AccessKeyId     string
	AccessKeySecret string
}
type OssType struct {
	Endpoint string
	Bucket   string
	ImgUrl   string
}

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
	cfg.Endpoint = "oss-cn-chengdu.aliyuncs.com"
	cfg.Bucket = "webmis-upload"
	cfg.ImgUrl = "http://img.webmis.vip/"
	return cfg
}
