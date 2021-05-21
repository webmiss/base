package tencent

import "webmis/config"

/* 实时音视频 */
type Trtc struct {
	Signature
	SdkAppId int
}

/* 公共配置 */
func (t *Trtc) Init() {
	t.New()
	// t.ApiUrl = "https://trtc.tencentcloudapi.com/"
	// t.Host = "trtc.tencentcloudapi.com"
	// t.Service = "trtc"
	// t.Version = "2019-07-22"
	cfg := config.TRTC()
	t.SdkAppId = cfg.SDKAppID
}

/* 房间-查询 */
func (t Trtc) RoomList() {
	t.Init()
	data := map[string]interface{}{}
	t.V3Header(data)
}
