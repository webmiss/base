package model

// User :用户表
type User struct {
	Model
}

// New :构造函数
func (m *User) New() *User {
	m.Conn("")
	m.Table("user")
	return m
}
