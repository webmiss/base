package model

type Demo struct {
	Model
	Table string
}

/* 构造函数 */
func (db *Demo) Init() *Demo {
	db.setTable("test")
	return db
}
