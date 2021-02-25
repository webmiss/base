package model

import (
	"database/sql"
	"time"
	"webmis/app/config"

	_ "github.com/go-sql-driver/mysql"
)

/* 数据库 */
type Model struct {
	_conn    *sql.DB //连接
	_sql     string  //SQL
	_table   string  //数据表
	_columns string  //字段
	_where   string  //条件
	_group   string  //分组
	_order   string  //排序
	_limit   string  //限制
}

/* 链接 */
func (m *Model) _connect() *sql.DB {
	cfg := (&config.Mysql{}).Init()
	dsn := cfg.User + ":" + cfg.Password + "@tcp(" + cfg.Host + ":" + cfg.Port + ")/" + cfg.Db + "?charset=" + cfg.Charset + "&parseTime=True&loc=Local"
	db, err := sql.Open(cfg.Type, dsn)
	if err != nil {
		panic(err)
	}
	// 数据池
	db.SetMaxIdleConns(cfg.Min)
	db.SetMaxOpenConns(cfg.Max)
	db.SetConnMaxLifetime(time.Second * time.Duration(cfg.Time))
	// 默认值
	m._conn = db
	return db
}

/* 过滤条件 */
func (db *Model) bind(where string) string {
	return where
}

/* 查询-多条 */
func (db *Model) find() (*sql.Rows, error) {
	// 连接
	if db._conn == nil {
		db._conn = db._connect()
	}
	// SQL
	db._sql = db._getSelect()
	rows, err := db._conn.Query(db._sql)
	return rows, err
}

/* 查询-单条 */
func (db *Model) findFirst() (*sql.Rows, error) {
	// 连接
	if db._conn == nil {
		db._conn = db._connect()
	}
	// SQL
	db._limit = "0,1"
	db._sql = db._getSelect()
	rows, err := db._conn.Query(db._sql)
	return rows, err
}

/* 查询-生成 */
func (db *Model) _getSelect() string {
	var sql string = "SELECT " + db._columns + " FROM " + db._table
	if db._where != "" {
		sql += " WHERE " + db._where
	}
	if db._group != "" {
		sql += " GROUP BY " + db._group
	}
	if db._order != "" {
		sql += " ORDER BY " + db._order
	}
	if db._limit != "" {
		sql += " LIMIT " + db._limit
	}
	return sql
}

/* 获取查询结果 */
func (db *Model) findDataOne(rows *sql.Rows) interface{} {
	res := db.findData(rows)
	return res[0]
}
func (db *Model) findData(rows *sql.Rows) []interface{} {
	// 字段长度
	columns, _ := rows.Columns()
	key := make([]interface{}, len(columns))
	val := make([]interface{}, len(columns))
	for n := range val {
		key[n] = &val[n]
	}
	// 数据处理
	var i int = 0
	res := make([]interface{}, 0, 10)
	for rows.Next() {
		rows.Scan(key...)
		tmp := make(map[string]interface{})
		for k, v := range val {
			if v != nil {
				tmp[columns[k]] = string(v.([]byte))
			} else {
				tmp[columns[k]] = ""
			}
		}
		res = append(res, tmp)
		i++
	}
	return res
}

/* 查询-添加 */
func (db *Model) create() {
	// 连接
	if db._conn == nil {
		db._conn = db._connect()
	}

}

/* 关闭 */
func (db *Model) Close(rows *sql.Rows) {
	defer rows.Close()
	defer db._conn.Close()
}
