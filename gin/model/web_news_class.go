package model

/* 新闻分类 */
type WebNewsClass struct {
	Model
}

/* 构造函数 */
func (m *WebNewsClass) New() *WebNewsClass {
	m.Table("web_news_class")
	return m
}
