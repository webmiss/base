package model

type SysConfig struct {
	Model
}

/* 系统配置表 */
func (self *SysConfig) Init() *SysConfig {
	self.Db("")
	self.Table("sys_config")
	return self
}
