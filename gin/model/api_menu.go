package model

// SysMenu :API菜单
type ApiMenu struct {
	Model
}

// New :构造函数
func (m *ApiMenu) New() *ApiMenu {
	m.Conn("")
	m.Table("api_menus")
	return m
}
