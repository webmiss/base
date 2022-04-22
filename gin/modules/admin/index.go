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

	// 今日流量
	(&baidu.Baidu{}).SiteList()
	today := map[string]interface{}{
		"day":   0,
		"pv":    0,
		"uv":    0,
		"ip":    0,
		"ratio": 0,
		"time":  0,
	}
	yesterday := map[string]interface{}{
		"day":   0,
		"pv":    0,
		"uv":    0,
		"ip":    0,
		"ratio": 0,
		"time":  0,
	}
	data["TrendRpt"] = map[string]interface{}{"today": today, "yesterday": yesterday}

	// 趋势分析
	tmp := []map[string]interface{}{}
	tmp = append(tmp, map[string]interface{}{
		"type":  "浏览量(PV)",
		"label": "1月",
		"value": 0,
	})
	tmp = append(tmp, map[string]interface{}{
		"type":  "访客数(UV)",
		"label": "1月",
		"value": 1,
	})
	tmp = append(tmp, map[string]interface{}{
		"type":  "IP数",
		"label": "1月",
		"value": 2,
	})
	data["Trend"] = tmp

	// 返回
	r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "data": data})

	// // 统计图1
	// chart1 := []map[string]interface{}{}
	// day := util.Date("2006-01-02")
	// last1 := util.DateFormat("2006-01-02", "24h")
	// last2 := util.DateFormat("2006-01-02", "-24h")
	// for i := 0; i < 24; i++ {
	// 	if i == 23 {
	// 		dt1 = day + " " + (&util.Type{}).Strval(i) + ":00:00"
	// 		dt2 = last1 + " 00:00:00"
	// 		dt3 = last2 + " " + (&util.Type{}).Strval(i) + ":00:00"
	// 		dt4 = day + " 00:00:00"
	// 	} else {
	// 		dt1 = day + " " + (&util.Type{}).Strval(i) + ":00:00"
	// 		dt2 = day + " " + (&util.Type{}).Strval(i+1) + ":00:00"
	// 		dt3 = last2 + " " + (&util.Type{}).Strval(i) + ":00:00"
	// 		dt4 = last2 + " " + (&util.Type{}).Strval(i+1) + ":00:00"
	// 	}
	// 	t1 = util.Strtotime(dt1, "")
	// 	t2 = util.Strtotime(dt2, "")
	// 	t3 = util.Strtotime(dt3, "")
	// 	t4 = util.Strtotime(dt4, "")
	// 	// 统计
	// 	m1 := (&model.Logs{}).New()
	// 	m1.Columns("count(*) as total")
	// 	m1.Where("ctime>=? AND ctime<? AND source=?", t1, t2, config.Env().LogSource)
	// 	d1 := m1.FindFirst()
	// 	chart1 = append(chart1, map[string]interface{}{
	// 		"type":  "今日(PV)",
	// 		"label": (&util.Type{}).Strval(i),
	// 		"value": (&util.Type{}).Int(d1["total"]),
	// 	})
	// 	m2 := (&model.Logs{}).New()
	// 	m2.Columns("count(*) as total")
	// 	m2.Where("ctime>=? AND ctime<? AND source=?", t3, t4, config.Env().LogSource)
	// 	d2 := m2.FindFirst()
	// 	chart1 = append(chart1, map[string]interface{}{
	// 		"type":  "昨日(PV)",
	// 		"label": (&util.Type{}).Strval(i),
	// 		"value": (&util.Type{}).Int(d2["total"]),
	// 	})
	// }
	// // 统计图2
	// chart2 := []map[string]interface{}{}
	// year := util.Date("2006")
	// last1 = (&util.Type{}).Strval((&util.Type{}).Int(year) + 1)
	// last2 = (&util.Type{}).Strval((&util.Type{}).Int(year) - 1)
	// for i := 0; i < 12; i++ {
	// 	if i == 11 {
	// 		dt1 = year + "-" + (&util.Type{}).Strval(i+1) + "-01"
	// 		dt2 = last1 + "-01-01"
	// 		dt3 = last2 + "-" + (&util.Type{}).Strval(i+1) + "-01"
	// 		dt4 = year + "-01-01"
	// 	} else {
	// 		dt1 = year + "-" + (&util.Type{}).Strval(i+1) + "-01"
	// 		dt2 = year + "-" + (&util.Type{}).Strval(i+2) + "-01"
	// 		dt3 = last2 + "-" + (&util.Type{}).Strval(i+1) + "-01"
	// 		dt4 = last2 + "-" + (&util.Type{}).Strval(i+2) + "-01"
	// 	}
	// 	t1 = util.Strtotime(dt1, "2006-1-02")
	// 	t2 = util.Strtotime(dt2, "2006-1-02")
	// 	t3 = util.Strtotime(dt3, "2006-1-02")
	// 	t4 = util.Strtotime(dt4, "2006-1-02")
	// 	// 统计
	// 	m1 := (&model.Logs{}).New()
	// 	m1.Columns("count(*) as total")
	// 	m1.Where("ctime>=? AND ctime<? AND source=?", t1, t2, config.Env().LogSource)
	// 	d1 := m1.FindFirst()
	// 	chart2 = append(chart2, map[string]interface{}{
	// 		"type":  "今年(PV)",
	// 		"label": (&util.Type{}).Strval(i + 1),
	// 		"value": (&util.Type{}).Int(d1["total"]),
	// 	})
	// 	m2 := (&model.Logs{}).New()
	// 	m2.Columns("count(*) as total")
	// 	m2.Where("ctime>=? AND ctime<? AND source=?", t3, t4, config.Env().LogSource)
	// 	d2 := m2.FindFirst()
	// 	chart2 = append(chart2, map[string]interface{}{
	// 		"type":  last2 + "年(PV)",
	// 		"label": (&util.Type{}).Strval(i + 1),
	// 		"value": (&util.Type{}).Int(d2["total"]),
	// 	})
	// }
	// // 统计图3
	// chart3 := []map[string]interface{}{}
	// m1 := (&model.Logs{}).New()
	// m1.Columns("count(*) as total")
	// m1.Where("source=?", config.Env().LogSource)
	// d1 := m1.FindFirst()
	// m2 := (&model.Logs{}).New()
	// m2.Columns("count(*) as total", "browser")
	// m2.Where("source=?", config.Env().LogSource)
	// m2.Group("browser")
	// d2 := m2.Find()
	// for _, val := range d2 {
	// 	ratio := (&util.Type{}).Float(fmt.Sprintf("%.2f", (&util.Type{}).Float(val["total"])/(&util.Type{}).Float(d1["total"])))
	// 	chart3 = append(chart3, map[string]interface{}{
	// 		"label": val["browser"],
	// 		"value": ratio,
	// 	})
	// }
	// // 返回
	// r.GetJSON(c, gin.H{"code": 0, "msg": "成功", "chart1": chart1, "chart2": chart2, "chart3": chart3})
}
