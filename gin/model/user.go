package model

/* 用户表构造函数 */
type User struct {
	Model
}

/* 构造函数 */
func (self *User) Init() *User {
	self.Db("")
	self.Table("user")
	return self
}
