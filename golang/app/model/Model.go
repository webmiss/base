package model

import (
	"database/sql"
	"fmt"
	"time"
	"webmis/app"

	_ "github.com/go-sql-driver/mysql"
)

/* 数据库 */
type Model struct {
	_conn  *sql.DB //连接
	_table string  //数据表
}

/* 链接 */
func (m *Model) _connect() {
	cfg := app.Mysql()
	dsn := cfg["user"].(string) + ":" + cfg["password"].(string) + "@tcp(" + cfg["host"].(string) + ":" + cfg["port"].(string) + ")/" + cfg["db"].(string) + "?charset=" + cfg["charset"].(string) + "&parseTime=True&loc=Local"
	db, err := sql.Open(cfg["type"].(string), dsn)
	if err != nil {
		// panic(err)
	}
	// 是否成功
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	// 数据池
	t := int64(cfg["time"].(int))
	db.SetMaxIdleConns(cfg["min"].(int))
	db.SetMaxOpenConns(cfg["max"].(int))
	db.SetConnMaxLifetime(time.Second * time.Duration(t))
	// 对象
	m._conn = db
}

/* 设置数据表 */
func (db *Model) setTable(table string) *Model {
	db._table = table
	return db
}

type Test struct {
	uid   int64
	title string
	ctime string
	utime string
}

/* 查询 */
func (db *Model) Select() bool {
	// 连接
	if db._conn == nil {
		db._connect()
	}
	rows, err := db._conn.Query("SELECT * FROM test limit 0,1")
	defer rows.Close()
	if err != nil {
		panic(err)
	}
	columns, _ := rows.Columns()
	key := make([]interface{}, len(columns))
	val := make([]interface{}, len(columns))
	for n := range val {
		key[n] = &val[n]
	}
	res := make(map[string]string)
	for rows.Next() {
		err = rows.Scan(key...)
		for x, y := range val {
			if y != nil {
				res[columns[x]] = string(y.([]byte))
			} else {
				res[columns[x]] = ""
			}
		}
	}
	fmt.Println("数据: ", res)
	return true
	// rows := db._conn.Table(db._table)
	// return rows
}
