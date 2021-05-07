package config

/* 腾讯云配置 */
type TencentType struct {
	SDKAppID   int
	SecretKey  string
	PlayDomain string
	PlayType   string
}

/* 实时音视频 */
func TRTC() *TencentType {
	cfg := &TencentType{}
	cfg.SDKAppID = 1400517751                                                          //AppID
	cfg.SecretKey = "f47b43f0dc84c945b684fd3f0f11f818832e34df451757db48de5fd912264845" //AppKey
	cfg.PlayDomain = "play.webmis.vip"                                                 //播放域名
	cfg.PlayType = "http"                                                              //播放类型
	return cfg
}
