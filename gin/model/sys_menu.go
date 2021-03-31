package model

/* 系统菜单 */
type SysMenu struct {
	Model
}

/* 构造函数 */
func (m *SysMenu) New() *SysMenu {
	m.Conn("")
	m.Table("sys_menus")
	return m
}
