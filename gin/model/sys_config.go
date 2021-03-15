package model

// SysConfig :系统配置表
type SysConfig struct {
	Model
}

// New :构造函数
func (m *SysConfig) New() *SysConfig {
	m.Conn("")
	m.Table("sys_config")
	return m
}
