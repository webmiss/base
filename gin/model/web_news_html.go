package model

/* 新闻内容 */
type WebNewsHtml struct {
	Model
}

/* 构造函数 */
func (m *WebNewsHtml) New() *WebNewsHtml {
	m.Table("web_news_html")
	return m
}
