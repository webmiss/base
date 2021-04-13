package model

/* 系统配置表 */
type SysConfig struct {
	Model
}

/* 构造函数 */
func (m *SysConfig) New() *SysConfig {
	m.Init("")
	m.Table("sys_config")
	return m
}
