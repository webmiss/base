package model

/* 用户表 */
type User struct {
	Model
}

/* 构造函数 */
func (m *User) New() *User {
	m.Conn("")
	m.Table("user")
	return m
}
