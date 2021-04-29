package model

/* 系统角色表 */
type SysRole struct {
	Model
}

/* 构造函数 */
func (m *SysRole) New() *SysRole {
	m.Table("sys_role")
	return m
}
