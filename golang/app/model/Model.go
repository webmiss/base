package model

import (
	"golang/app"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

/* 数据库 */
type Model struct {
	_conn  *gorm.DB //连接
	_table string   //数据表
}

/* 链接 */
func (m *Model) _connect() {
	cfg := app.Mysql()
	dsn := cfg["user"] + ":" + cfg["password"] + "@tcp(" + cfg["host"] + ":" + cfg["port"] + ")/" + cfg["db"] + "?charset=" + cfg["charset"] + "&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	m._conn = db
}

/* 设置数据表 */
func (db *Model) setTable(table string) *Model {
	db._table = table
	return db
}

/* 模型 */
func (m *Model) Db() *gorm.DB {
	// 连接
	if m._conn == nil {
		m._connect()
	}
	return m._conn
}

/* 查询 */
func (db *Model) Select() *gorm.DB {
	// 连接
	if db._conn == nil {
		db._connect()
	}
	rows := db._conn.Table(db._table)
	return rows
}
