package admin

import (
	"webmis/library/baidu"
	"webmis/model"
	"webmis/service"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

/* Admin */
type Index struct {
	service.Base
	site_id string
}

/* 首页 */
func (r Index) Index(c *gin.Context) {
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "Admin"})
}

/* 系统配置 */
func (r Index) GetConfig(c *gin.Context) {
	// 查询
	model := (&model.SysConfig{}).New()
	model.Where("name in (?,?,?,?)", "title", "copy", "logo", "login_bg")
	model.Columns("name", "val")
	data := model.Find()
	// 数据
	list := map[string]interface{}{}
	for _, val := range data {
		name := (&util.Type{}).Strval(val["name"])
		if name == "logo" || name == "login_bg" {
			list[name] = (&service.Data{}).Img(val["val"])
		} else {
			list[name] = val["val"]
		}
	}
	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "list": list})
}

/* 图表数据 */
func (r Index) GetChart(c *gin.Context) {
	r.site_id = "17669804"
	var res []byte
	var sDate string
	var eDate string
	day := util.DateFormat("20060102", "0s")

	data := map[string]interface{}{}
	// 参数
	json := map[string]interface{}{}
	c.BindJSON(&json)
	token, _ := r.JsonName(json, "token")
	// 验证
	msg := (&service.AdminToken{}).Verify(token, "")
	if msg != "" {
		r.GetJSON(c, gin.H{"code": 4001, "msg": msg})
		return
	}

	/* 今日流量 */
	sDate = util.DateFormat("20060102", "-24h")
	eDate = day
	res = (&baidu.Baidu{}).TrendRpt(map[string]interface{}{
		"site_id":    r.site_id,
		"start_date": sDate,
		"end_date":   eDate,
		"metrics":    "pv_count,visitor_count,ip_count,bounce_ratio,avg_visit_time",
	})
	d1 := map[string][][][]interface{}{}
	util.JsonDecode(res, &d1)
	t := d1["items"]
	t1 := t[1][1]
	t2 := t[1][0]
	today := map[string]interface{}{
		"day":   t[0][1][0],
		"pv":    util.If(t1[0] != "--", t1[0], 0),
		"uv":    util.If(t1[1] != "--", t1[1], 0),
		"ip":    util.If(t1[2] != "--", t1[2], 0),
		"ratio": util.If(t1[3] != "--", t1[3], 0),
		"time":  util.If(t1[4] != "--", t1[4], 0),
	}
	yesterday := map[string]interface{}{
		"day":   t[0][0][0],
		"pv":    util.If(t2[0] != "--", t2[0], 0),
		"uv":    util.If(t2[1] != "--", t2[1], 0),
		"ip":    util.If(t2[2] != "--", t2[2], 0),
		"ratio": util.If(t2[3] != "--", t2[3], 0),
		"time":  util.If(t2[4] != "--", t2[4], 0),
	}
	data["TrendRpt"] = map[string]interface{}{"today": today, "yesterday": yesterday}

	/* 趋势分析 */
	tp, _ := r.JsonName(json, "type")
	gran := "day"
	if tp == "t1" {
		gran = "hour"
		sDate = day
		eDate = day
	} else if tp == "t2" {
		gran = "hour"
		sDate = util.DateFormat("20060102", "-1d")
		eDate = sDate
	} else if tp == "t3" {
		sDate = util.DateFormat("20060102", "-6d")
		eDate = day
	} else if tp == "t4" {
		sDate = util.DateFormat("20060102", "-29d")
		eDate = day
	}
	res = (&baidu.Baidu{}).Trend(map[string]interface{}{
		"site_id":    r.site_id,
		"start_date": sDate,
		"end_date":   eDate,
		"metrics":    "pv_count,visitor_count,ip_count",
		"gran":       gran,
	})
	d2 := map[string][][][]interface{}{}
	util.JsonDecode(res, &d2)
	// 数据
	var label interface{}
	var value interface{}
	trend := []map[string]interface{}{}
	n := len(d2["items"][0]) - 1
	for i := n; i >= 0; i-- {
		if tp == "t1" || tp == "t2" {
			label = (&util.Type{}).Strval(n-i) + "点"
		} else {
			label = d2["items"][0][i][0]
		}
		// 浏览量(PV)
		value = util.If(d2["items"][1][i][0] == "--", 0, d2["items"][1][i][0])
		trend = append(trend, map[string]interface{}{
			"type":  "浏览量(PV)",
			"label": label,
			"value": value,
		})
		// 访客数(UV)
		value = util.If(d2["items"][1][i][1] == "--", 0, d2["items"][1][i][1])
		trend = append(trend, map[string]interface{}{
			"type":  "访客数(UV)",
			"label": label,
			"value": value,
		})
		// IP数
		value = util.If(d2["items"][1][i][2] == "--", 0, d2["items"][1][i][2])
		trend = append(trend, map[string]interface{}{
			"type":  "IP数",
			"label": label,
			"value": value,
		})
	}
	data["Trend"] = trend

	/* 返回 */
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "data": data})
}
