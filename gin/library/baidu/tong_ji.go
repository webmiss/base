package baidu

import (
	"fmt"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

var Url string = "https://api.baidu.com/json/tongji/v1/"

/* 类型 */
type Baidu struct {
}

/* 公共配置 */
func (b *Baidu) GetData(body map[string]interface{}) []byte {
	cfg := config.TongJi()
	json := map[string]interface{}{}
	json["header"] = map[string]interface{}{
		"username":     cfg.UserName,
		"password":     cfg.PassWord,
		"token":        cfg.Token,
		"account_type": cfg.AccountType,
	}
	if body != nil {
		json["body"] = body
	}
	return util.JsonEncode(json)
}

/* 返回结果 */
func (b *Baidu) result(res []byte) map[string]interface{} {
	// data := res["body"]["data"]
	return nil
}

/* 站点列表 */
func (b *Baidu) SiteList() []byte {
	dataStr := b.GetData(nil)
	res, _ := (&library.Curl{}).Request(Url+"ReportService/getSiteList", dataStr, "POST", nil)
	fmt.Println(res)
	return nil
}
