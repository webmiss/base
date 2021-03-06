package model

/* 用户表构造函数 */
type User struct {
	Model
}

/* 构造函数 */
func (this *User) Init() *User {
	this.Table("user")
	return this
}
