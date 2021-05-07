package tencent

import (
	"crypto/hmac"
	"crypto/sha256"
	"fmt"
	"webmis/config"
	"webmis/util"
)

/* 即时通信 */
type Im struct{}

/* 鉴权票据 */
func (i Im) UserSig(userId int64, expire ...int) string {
	// 默认值
	expire_time := 86400 * 180
	if len(expire) > 0 {
		expire_time = expire[0]
	}
	// 配置
	cfg := config.TRTC()
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
	return (&util.Base64{}).UrlEncode(string(res))
}

/* 验证 */
func (i Im) VerifySig(userId int64, userSig string) bool {
	// 数据
	base64 := (&util.Base64{}).UrlDecode(userSig)
	fmt.Println(base64)
	return true
}

/* 获取Sig */
func (Im) hmacsha256(param map[string]string, key string) string {
	content := ""
	for k, v := range param {
		if k == "TLS.ver" || k == "TLS.sig" {
			continue
		}
		content += k + ":" + v + "\n"
	}
	h := hmac.New(sha256.New, []byte(key))
	h.Write([]byte(content))
	return (&util.Base64{}).Encode(string(h.Sum(nil)))
}
