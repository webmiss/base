package model

type SysConfig struct {
	Model
}

/* 系统配置表 */
func (this *SysConfig) Init() *SysConfig {
	this.Table("sys_config")
	return this
}
