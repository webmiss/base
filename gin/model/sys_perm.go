package model

/* 后台权限表 */
type SysPerm struct {
	Model
}

/* 构造函数 */
func (m *SysPerm) New() *SysPerm {
	m.Table("sys_perm")
	return m
}
