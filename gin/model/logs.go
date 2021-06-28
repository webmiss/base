package model

/* 访问日志 */
type Logs struct {
	Model
}

/* 构造函数 */
func (m *Logs) New() *Logs {
	m.Table("logs")
	return m
}
