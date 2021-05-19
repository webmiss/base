package tencent

import (
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

var __url string = "https://console.tim.qq.com/v4/"

/* 即时通信 */
type Im struct {
	Url         string
	ContentType string
}

/* 构造函数 */
func (i *Im) New() *Im {
	i.Url = "https://console.tim.qq.com/v4/"
	i.ContentType = "json"
	return i
}

/* 群组-列表 */
func (i Im) GroupList(data interface{}) map[string]interface{} {
	url := i.GetURL("group_open_http_svc/get_appid_group_list")
	return (&library.Curl{}).PostJson(url, data)
}

/* 群组-创建 */
func (i Im) GroupCreate(data interface{}) map[string]interface{} {
	url := i.GetURL("group_open_http_svc/create_group")
	return (&library.Curl{}).PostJson(url, data)
}

/* 群组-解散 */
func (i Im) GroupDestroy(data interface{}) map[string]interface{} {
	url := i.GetURL("group_open_http_svc/destroy_group")
	return (&library.Curl{}).PostJson(url, data)
}

/* 请求地址 */
func (i Im) GetURL(apiUrl string) string {
	cfg := config.TRTC()
	userSig := i.UserSig(cfg.UserID)
	random := util.Strval(util.Time())
	return i.Url + apiUrl + "?sdkappid=" + util.Strval(cfg.SDKAppID) + "&identifier=" + cfg.UserID + "&usersig=" + userSig + "&random=" + random + "&contenttype=" + i.ContentType
}

/* 鉴权票据 */
func (i Im) UserSig(userId interface{}, expire ...int) string {
	// 配置
	cfg := config.TRTC()
	// 默认值
	expire_time := cfg.ExpireTime
	if len(expire) > 0 {
		expire_time = expire[0]
	}
	// 参数
	param := map[string]string{
		"TLS.ver":        "2.0",
		"TLS.identifier": util.Strval(userId),
		"TLS.sdkappid":   util.Strval(cfg.SDKAppID),
		"TLS.expire":     util.Strval(expire_time),
		"TLS.time":       util.Strval(util.Time()),
	}
	param["TLS.sig"] = i.hmacsha256(param, cfg.SecretKey)
	data := util.JsonEncode(param)
	// 压缩
	res := (&util.Base64{}).Compress(data)
	return (&util.Base64{}).UrlEncode(res)
}

/* 验证签名 */
func (i Im) VerifySig(userId interface{}, userSig string) int64 {
	// 解码
	base64 := (&util.Base64{}).UrlDecode(userSig)
	if base64 == nil {
		return 0
	}
	// 解压
	un_sig := (&util.Base64{}).UnCompress(base64)
	if un_sig == nil {
		return 0
	}
	data := map[string]string{}
	util.JsonDecode(un_sig, &data)
	// 配置
	cfg := config.TRTC()
	if util.Strval(cfg.SDKAppID) != data["TLS.sdkappid"] {
		return 0
	}
	if util.Strval(userId) != data["TLS.identifier"] {
		return 0
	}
	// 是否过期
	now_time := util.Time()
	out_time := util.Int64(data["TLS.time"]) + util.Int64(data["TLS.expire"])
	if now_time > out_time {
		return 0
	}
	// 验证Sig
	sig := i.hmacsha256(data, cfg.SecretKey)
	if sig != data["TLS.sig"] {
		return 0
	}
	return out_time - now_time
}

/* 获取Sig */
func (i Im) hmacsha256(param map[string]string, key string) string {
	content := "TLS.identifier:" + param["TLS.identifier"] + "\n"
	content += "TLS.sdkappid:" + param["TLS.sdkappid"] + "\n"
	content += "TLS.time:" + param["TLS.time"] + "\n"
	content += "TLS.expire:" + param["TLS.expire"] + "\n"
	sig := string(util.Sha256(content, key))
	return (&util.Base64{}).Encode(sig)
}
