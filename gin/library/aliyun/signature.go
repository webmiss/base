package aliyun

import (
	"fmt"
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
	expiration = "2021-06-15T19:10:41Z"
	// 签名数据
	policyData := map[string]interface{}{"expiration": expiration, "conditions": conditions}
	policyStr := util.JsonEncode(policyData)
	policy := (&util.Base64{}).Encode(policyStr)
	signature := (&util.Base64{}).Encode((&util.Hash{}).HmacSha1(policy, []byte(cfg.AccessKeySecret)))
	fmt.Println(policyData)
	fmt.Println(policy)
	fmt.Println(signature)
	// 返回
	res := map[string]interface{}{}
	res["accessid"] = cfg.AccessKeyId
	res["policy"] = policy
	res["signature"] = signature
	res["expire"] = expire
	return res
}
