package config

/* 腾讯云配置 */
type RamType struct {
	AccessKeyId     string
	AccessKeySecret string
	Endpoint        string
	Bucket          string
	ImgUrl          string
}

/* API密钥 */
func RAM() *RamType {
	cfg := &RamType{}
	cfg.AccessKeyId = "LTAI5t9BgHZ11gu1WvTdTSns"
	cfg.AccessKeySecret = "WIsk3M2U7MuE526SIuc5xAdxOc2Pge"
	cfg.Endpoint = "oss-cn-chengdu.aliyuncs.com"
	cfg.Bucket = "cuixs-upload-test"
	cfg.ImgUrl = "http://img.cuixs.net/"
	return cfg
}
