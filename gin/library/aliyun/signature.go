package aliyun

import (
	"crypto"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"io/ioutil"
	"net/http"
	"webmis/config"
	"webmis/util"
)

/* 签名 */
type Signature struct{}

/* 签名直传 */
func (Signature) PolicySign(expireTime int64, maxSize int64) map[string]interface{} {
	// 配置
	cfg := config.RAM()
	conditions := []interface{}{}
	// 限制大小
	conditions = append(conditions, []interface{}{"content-length-range", 0, maxSize})
	// 超时时间
	now := util.Time()
	expire := now + expireTime
	expiration := util.GmtISO8601(expire)
	// 签名数据
	policyData := map[string]interface{}{"expiration": expiration, "conditions": conditions}
	policyStr := util.JsonEncode(policyData)
	policy := (&util.Base64{}).Encode(policyStr)
	signature := (&util.Base64{}).Encode((&util.Hash{}).HmacSha1(policy, []byte(cfg.AccessKeySecret)))
	// 返回
	res := map[string]interface{}{}
	res["accessid"] = cfg.AccessKeyId
	res["policy"] = policy
	res["signature"] = signature
	res["expire"] = expire
	return res
}

/* 验证签名 */
func (Signature) VerifySignature(publicKeyUrlBase64 string, authorizationBase64 string, callbackBody string) bool {
	// 获取公钥
	publicKeyUrl := (&util.Base64{}).Decode(publicKeyUrlBase64)
	resPublicKey, _ := http.Get(string(publicKeyUrl))
	bytePublicKey, _ := ioutil.ReadAll(resPublicKey.Body)
	defer resPublicKey.Body.Close()
	// 获取签名
	byteAuthorization := (&util.Base64{}).Decode(authorizationBase64)
	// 签名字符串
	cfg := config.OSS()
	cfg.CallbackUrl = "https://demo-go.webmis.vip/files-callback"
	authStr := cfg.CallbackUrl + "\n" + callbackBody
	fmt.Println(authStr)
	// 验证签名
	byteMd5 := (&util.Hash{}).Md5Byte(authStr)
	pubBlock, _ := pem.Decode(bytePublicKey)
	if pubBlock == nil {
		return false
	}
	pubInterface, _ := x509.ParsePKIXPublicKey(pubBlock.Bytes)
	if pubInterface == nil {
		return false
	}
	pub := pubInterface.(*rsa.PublicKey)
	err := rsa.VerifyPKCS1v15(pub, crypto.MD5, byteMd5, byteAuthorization)
	fmt.Println(err)
	if err != nil {
		return false
	}
	return true
}
