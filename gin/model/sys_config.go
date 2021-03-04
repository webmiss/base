package model

type SysConfig struct {
	Model
}

/* 初始化 */
func (db *SysConfig) Init() *SysConfig {
	db.Table("sys_config")
	return db
}
