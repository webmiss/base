package model

import (
	"gorm.io/gorm"
)

type Demo struct {
	Model
	Table string
}
type Test struct {
	gorm.Model
	uid   int8
	title string
}

/* 构造函数 */
func (db *Demo) Init() *Demo {
	db.setTable("test")
	return db
}
