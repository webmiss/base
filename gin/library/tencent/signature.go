package tencent

import (
	"fmt"
	"time"
	"webmis/config"
	"webmis/util"
)

/* 签名 */
type Signature struct {
	ApiUrl               string
	Host                 string
	Service              string
	RequestMethod        string
	ContentType          string
	CanonicalURI         string
	CanonicalQueryString string
	SignedHeaders        string
	Algorithm            string
	Action               string
	Version              string
	Region               string
}

/* 构造函数 */
func (s *Signature) New() *Signature {
	s.ApiUrl = "https://cvm.tencentcloudapi.com/"     //接口
	s.Host = "cvm.tencentcloudapi.com"                //主机
	s.Service = "cvm"                                 //服务
	s.RequestMethod = "POST"                          //请求方式
	s.ContentType = "application/json; charset=utf-8" //数据类型
	s.CanonicalURI = "/"                              //URI参数
	s.CanonicalQueryString = ""                       //查询字符串: Limit=10&Offset=0
	s.SignedHeaders = "content-type;host"             //参与签名
	s.Algorithm = "TC3-HMAC-SHA256"                   //签名算法
	s.Action = "DescribeInstances"                    //动作
	s.Version = "2017-03-12"                          //版本
	s.Region = "ap-guangzhou"                         //区域
	return s
}

/* V3-Header */
func (s Signature) V3Header(data map[string]interface{}) {
	var Hash = &util.Hash{}
	// 数据
	json := string(util.JsonEncode(data))
	HashedRequestPayload := Hash.Sha256(json)
	// 请求串
	CanonicalRequest := s.RequestMethod + "\n"
	CanonicalRequest += s.CanonicalURI + "\n"
	CanonicalRequest += s.CanonicalQueryString + "\n"
	CanonicalRequest += "content-type:" + s.ContentType + "\n" + "host:" + s.Host + "\n" + "\n"
	CanonicalRequest += s.SignedHeaders + "\n"
	CanonicalRequest += HashedRequestPayload
	// 字符串
	timeStamp := util.Time()
	date := time.Unix(timeStamp, 0).UTC().Format("2006-01-02")
	CredentialScope := date + "/" + s.Service + "/tc3_request"
	HashedCanonicalRequest := Hash.Sha256(CanonicalRequest)
	StringToSign := s.Algorithm + "\n"
	StringToSign += (&util.Type{}).Strval(timeStamp) + "\n"
	StringToSign += CredentialScope + "\n"
	StringToSign += HashedCanonicalRequest
	// 计算签名
	cfg := config.CAPI()
	SecretDate := Hash.HmacSha256(date, []byte("TC3"+cfg.SecretKey))
	SecretService := Hash.HmacSha256(s.Service, SecretDate)
	SecretSigning := Hash.HmacSha256("tc3_request", SecretService)
	Sign := Hash.HexEncode(Hash.HmacSha256(StringToSign, SecretSigning))
	// Authorization
	Authorization := s.Algorithm + " "
	Authorization += "Credential=" + cfg.SecretId + "/" + CredentialScope + ", "
	Authorization += "SignedHeaders=" + s.SignedHeaders + ", "
	Authorization += "Signature=" + Sign
	// 请求头
	fmt.Println(Authorization)
}

/* UserSig */
func (s Signature) UserSig(userId interface{}, expire ...int) string {
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
		"TLS.identifier": (&util.Type{}).Strval(userId),
		"TLS.sdkappid":   (&util.Type{}).Strval(cfg.SDKAppID),
		"TLS.expire":     (&util.Type{}).Strval(expire_time),
		"TLS.time":       (&util.Type{}).Strval(util.Time()),
	}
	param["TLS.sig"] = s.hmacsha256(param, cfg.SecretKey)
	data := util.JsonEncode(param)
	// 压缩
	res := (&util.Base64{}).Compress(data)
	return (&util.Base64{}).UrlEncode(res)
}

/* UserSig-验证 */
func (s Signature) VerifyUserSig(userId interface{}, userSig string) int64 {
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
	if (&util.Type{}).Strval(cfg.SDKAppID) != data["TLS.sdkappid"] {
		return 0
	}
	if (&util.Type{}).Strval(userId) != data["TLS.identifier"] {
		return 0
	}
	// 是否过期
	now_time := util.Time()
	out_time := (&util.Type{}).Int64(data["TLS.time"]) + (&util.Type{}).Int64(data["TLS.expire"])
	if now_time > out_time {
		return 0
	}
	// 验证Sig
	sig := s.hmacsha256(data, cfg.SecretKey)
	if sig != data["TLS.sig"] {
		return 0
	}
	return out_time - now_time
}

/* 获取Sig */
func (Signature) hmacsha256(param map[string]string, key string) string {
	content := "TLS.identifier:" + param["TLS.identifier"] + "\n"
	content += "TLS.sdkappid:" + param["TLS.sdkappid"] + "\n"
	content += "TLS.time:" + param["TLS.time"] + "\n"
	content += "TLS.expire:" + param["TLS.expire"] + "\n"
	sig := string((&util.Hash{}).HmacSha256(content, []byte(key)))
	return (&util.Base64{}).Encode(sig)
}
