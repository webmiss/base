package tencent

import (
	"sort"
	"webmis/config"
	"webmis/util"
)

/* 即时通信 */
type Im struct{}

/* 鉴权票据 */
func (i Im) UserSig(userId int64, expire ...int) string {
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

/* 验证 */
func (i Im) VerifySig(userId int64, userSig string) int64 {
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
	util.JsonDecode(string(un_sig), &data)
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
func (Im) hmacsha256(param map[string]string, key string) string {
	// 排序
	var keys []string
	for k := range param {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	// 拼接
	content := ""
	for _, k := range keys {
		if k == "TLS.ver" || k == "TLS.sig" {
			continue
		}
		content += k + ":" + param[k] + "\n"
	}
	return (&util.Base64{}).Encode((&util.Hmac{}).Sha256(content, key))
}
