package model

/* 测试表 */
type Demo struct {
	Model
}

/* 构造函数 */
func (m *Demo) New() *Demo {
	m.Init("")
	m.Table("test")
	return m
}
