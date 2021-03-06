package model

/* 测试表 */
type Demo struct {
	Model
}

/* 构造函数 */
func (this *Demo) Init() *Demo {
	this.Table("test")
	return this
}
