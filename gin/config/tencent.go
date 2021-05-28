package config

/* 腾讯云配置 */
type (
	TrtcType struct {
		SDKAppID   int
		SecretKey  string
		UserID     string
		ExpireTime int
		PlayDomain string
		PlayType   string
	}
	CapiType struct {
		AppID     int
		SecretId  string
		SecretKey string
	}
)

/* 实时音视频 */
func TRTC() *TrtcType {
	cfg := &TrtcType{}
	cfg.SDKAppID = 1400517751                                                          //AppID
	cfg.SecretKey = "f47b43f0dc84c945b684fd3f0f11f818832e34df451757db48de5fd912264845" //AppKey
	cfg.UserID = "administrator"                                                       //管理员账号
	cfg.ExpireTime = 86400 * 180                                                       //userSig有效期
	cfg.PlayDomain = "play.webmis.vip"                                                 //播放域名
	cfg.PlayDomain = "webrtc.cuixs.net"                                                //播放域名
	cfg.PlayType = "http"                                                              //播放类型
	return cfg
}

/* API密钥 */
func CAPI() *CapiType {
	cfg := &CapiType{}
	cfg.SecretId = "AKIDd4HDsHRKwBDySfbGfneEXZKp47uRiiTx"
	cfg.SecretKey = "FD0ZtwjFUS9ZhZBWaOwGLNBkBNM6brth"
	return cfg
}
