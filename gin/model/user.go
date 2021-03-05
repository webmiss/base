package model

type User struct {
	Model
}

/* 用户表 */
func (this *User) Init() *User {
	this.Table("user")
	return this
}
