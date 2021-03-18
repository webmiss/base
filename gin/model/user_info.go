package model

// UserInfo :用户信息
type UserInfo struct {
	Model
}

// New :构造函数
func (m *UserInfo) New() *UserInfo {
	m.Conn("")
	m.Table("user_info")
	return m
}
