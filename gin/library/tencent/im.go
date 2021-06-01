package tencent

import (
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

/* 即时通信 */
type Im struct {
	Signature
}

/* 请求地址 */
func (i Im) GetURL(apiUrl string) string {
	cfg := config.TRTC()
	userSig := i.UserSig(cfg.UserID)
	random := (&util.Type{}).Strval(util.Time())
	return "https://console.tim.qq.com/v4/" + apiUrl + "?sdkappid=" + (&util.Type{}).Strval(cfg.SDKAppID) + "&identifier=" + cfg.UserID + "&usersig=" + userSig + "&random=" + random + "&contenttype=json"
}

/* 群组-列表 */
func (i Im) GroupList() map[string]interface{} {
	url := i.GetURL("group_open_http_svc/get_appid_group_list")
	return (&library.Curl{}).PostJson(url, map[string]interface{}{}, nil)
}

/* 群组-创建 */
func (i Im) GroupCreate(data interface{}) map[string]interface{} {
	url := i.GetURL("group_open_http_svc/create_group")
	return (&library.Curl{}).PostJson(url, data, nil)
}

/* 群组-解散 */
func (i Im) GroupDestroy(data interface{}) map[string]interface{} {
	url := i.GetURL("group_open_http_svc/destroy_group")
	return (&library.Curl{}).PostJson(url, data, nil)
}
