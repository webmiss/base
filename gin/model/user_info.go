package model

/* 用户信息 */
type UserInfo struct {
	Model
}

/* 构造函数 */
func (m *UserInfo) New() *UserInfo {
	m.Init("")
	m.Table("user_info")
	return m
}
