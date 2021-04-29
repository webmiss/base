package model

/* API角色表 */
type ApiRole struct {
	Model
}

/* 构造函数 */
func (m *ApiRole) New() *ApiRole {
	m.Table("api_role")
	return m
}
