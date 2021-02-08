package model

import (
	"golang/app"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

/* 数据库 */
type Model struct {
	Conn  *gorm.DB //连接
	Table string   //数据表
}

/* 链接 */
func (m *Model) _connect() {
	cfg := app.Mysql()
	dsn := cfg["user"] + ":" + cfg["password"] + "@tcp(" + cfg["host"] + ":" + cfg["port"] + ")/" + cfg["db"] + "?charset=" + cfg["charset"] + "&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	m.Conn = db
}

/* 设置数据表 */
func (m *Model) setTable(table string) {
	m.Table = table
}

/* 模型 */
func (m *Model) Db() *gorm.DB {
	// 连接
	if m.Conn == nil {
		m._connect()
	}
	return m.Conn
}

type Result struct {
	uid   int
	title string
}

/* 查询-多条 */
func (db *Model) Find() *gorm.DB {
	// 连接
	if db.Conn == nil {
		db._connect()
	}
	row := db.Conn.Raw("SELECT uid,title from test")
	return row
}
