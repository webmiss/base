package model

// Demo :测试表
type Demo struct {
	Model
}

// New :构造函数
func (m *Demo) New() *Demo {
	m.Db("")
	m.Table("test")
	return m
}
