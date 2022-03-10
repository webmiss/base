package model

/* 新闻 */
type WebNews struct {
	Model
}

/* 构造函数 */
func (m *WebNews) New() *WebNews {
	m.Table("web_news")
	return m
}
