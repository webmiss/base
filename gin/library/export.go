package library

import (
	"webmis/util"
)

/* 导出 */
type Export struct{}

/* GExcel内容 */
func (e Export) Excel(data [][]interface{}, params map[string]interface{}) string {
	// 参数
	param := map[string]interface{}{
		"borderColor":  "#E2E4E8", //边框颜色
		"titleColor":   "#666",    //标题颜色
		"titleBgColor": "#F2F2F2", //标题背景
	}
	param = util.ArrayMerge(param, params)
	// 内容
	html := "<html>"
	html += "<style type=\"text/css\">"
	html += "table td{height: 32px; border: " + (&util.Type{}).Strval(param["borderColor"]) + " 1px solid;}"
	html += ".title{background-color: " + (&util.Type{}).Strval(param["titleBgColor"]) + "; color: " + (&util.Type{}).Strval(param["titleColor"]) + "; font-weight: bold;}"
	html += "</style>"
	html += "<table>"
	for k, v1 := range data {
		html += "<tr>"
		for _, v2 := range v1 {
			if k == 0 {
				html += "<td class=\"title\">" + (&util.Type{}).Strval(v2) + "</td>"
			} else {
				html += "<td>" + (&util.Type{}).Strval(v2) + "</td>"
			}
		}
		html += "</tr>"
	}
	html += "</table>"
	html += "</html>"
	return html
}
