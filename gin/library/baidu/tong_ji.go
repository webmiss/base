package baidu

import (
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
func (b *Baidu) result(res []byte) []byte {
	json := map[string]map[string][]map[string]interface{}{}
	util.JsonDecode(res, &json)
	data := json["body"]["data"]
	_, ok := data[0]["result"]
	if len(data) > 0 && ok {
		return util.JsonEncode(data[0]["result"])
	}
	return util.JsonEncode(data)
}

/* 站点列表 */
func (b *Baidu) SiteList() []byte {
	dataStr := b.GetData(nil)
	res, _ := (&library.Curl{}).Request(Url+"ReportService/getSiteList", dataStr, "POST", nil)
	return b.result(res)
}

/* 网站概况-趋势数据 */
func (b *Baidu) TrendRpt(params map[string]interface{}) []byte {
	// 参数
	param := map[string]interface{}{
		"method":     "overview/getTimeTrendRpt",
		"site_id":    "", //应用ID
		"start_date": "", //开始日期
		"end_date":   "", //结束日期
		"metrics":    "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time,trans_count",
	}
	param = util.ArrayMerge(param, params)
	// 请求
	dataStr := b.GetData(param)
	res, _ := (&library.Curl{}).Request(Url+"ReportService/getData", dataStr, "POST", nil)
	return b.result(res)
}

/* 趋势分析 */
func (b *Baidu) Trend(params map[string]interface{}) []byte {
	// 参数
	param := map[string]interface{}{
		"method":       "trend/time/a",
		"site_id":      "", //应用ID
		"start_date":   "", //开始日期
		"end_date":     "", //结束日期
		"metrics":      "pv_count,pv_ratio,visit_count,visitor_count,new_visitor_count,new_visitor_ratio,ip_count,bounce_ratio,avg_visit_time,avg_visit_pages,trans_count,trans_ratio,avg_trans_cost,income",
		"gran":         "default", //时间粒度: default/hour/day/week/month/year
		"source":       "all",     //来源: all/through/search,0/link/
		"clientDevice": "all",     //设备: all/pc/mobile
		"area":         "all",     //地域: all/china/province,1/province,4,90/other
		"visitor":      "all",     //访客: all/new/old
	}
	param = util.ArrayMerge(param, params)
	// 请求
	dataStr := b.GetData(param)
	res, _ := (&library.Curl{}).Request(Url+"ReportService/getData", dataStr, "POST", nil)
	return b.result(res)
}
