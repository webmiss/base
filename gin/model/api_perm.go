package model

/* API权限 */
type ApiPerm struct {
	Model
}

/* 构造函数 */
func (m *ApiPerm) New() *ApiPerm {
	m.Table("api_perm")
	return m
}
