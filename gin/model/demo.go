package model

/* 测试表 */
type Demo struct {
	Model
}

/* 构造函数 */
func (self *Demo) Init() *Demo {
	self.Db("")
	self.Table("test")
	return self
}
