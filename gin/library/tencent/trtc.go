package tencent

import (
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

/* 实时音视频 */
type Trtc struct {
	Signature
	SdkAppId int
}

/* 公共配置 */
func (t *Trtc) Init() {
	t.New()
	cfg := config.TRTC()
	t.ApiUrl = "https://trtc.tencentcloudapi.com/"
	t.Host = "trtc.tencentcloudapi.com"
	t.Service = "trtc"
	t.Version = "2019-07-22"
	t.SdkAppId = cfg.SDKAppID
}

/* 房间-查询 */
func (t *Trtc) RoomList(StartTime int64, EndTime int64) map[string]interface{} {
	// 参数
	t.Init()
	t.Action = "DescribeRoomInformation"
	// 数据
	data := map[string]interface{}{
		"SdkAppId":  (&util.Type{}).Strval(t.SdkAppId),
		"StartTime": StartTime,
		"EndTime":   EndTime,
	}
	// 请求头
	header := t.V3Header(data)
	byt, _ := (&library.Curl{}).Request(t.ApiUrl, util.JsonEncode(data), "POST", header)
	res := map[string]interface{}{}
	util.JsonDecode(byt, &res)
	return res
}

/* 房间-解散 */
func (t *Trtc) RoomDismiss(roomId string) map[string]interface{} {
	// 参数
	t.Init()
	t.Action = "DescribeRoomInformation"
	// 数据
	data := map[string]interface{}{
		"SdkAppId": (&util.Type{}).Strval(t.SdkAppId),
		"RoomId":   roomId,
	}
	// 请求头
	header := t.V3Header(data)
	byt, _ := (&library.Curl{}).Request(t.ApiUrl, util.JsonEncode(data), "POST", header)
	res := map[string]interface{}{}
	util.JsonDecode(byt, &res)
	return res
}
