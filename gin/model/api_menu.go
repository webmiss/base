package model

/* API菜单 */
type ApiMenu struct {
	Model
}

/* 构造函数 */
func (m *ApiMenu) New() *ApiMenu {
	m.Conn("")
	m.Table("api_menus")
	return m
}
