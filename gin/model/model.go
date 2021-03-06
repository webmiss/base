package model

import (
	"database/sql"
	"fmt"
	"strconv"
	"time"
	"webmis/base"
	"webmis/config"
	"webmis/service"
	"webmis/util"

	_ "github.com/go-sql-driver/mysql"
)

/* 数据库 */
type Model struct {
	base.Base
	conn    *sql.DB       //连接
	sql     string        //SQL
	table   string        //数据表
	columns string        //字段
	where   string        //条件
	group   string        //分组
	order   string        //排序
	limit   string        //限制
	args    []interface{} //参数
	keys    string        //新增-名
	values  string        //新增-值
	data    string        //更新-数据
}

/* 链接数据库 */
func (self *Model) Conn() *sql.DB {
	// 默认值
	self.args = make([]interface{}, 0, 10)
	if self.conn != nil {
		return self.conn
	}
	// 连接
	cfg := (&config.MySql{}).Config()
	source := cfg.User + ":" + cfg.Password + "@(" + cfg.Host + ":" + cfg.Port + ")/" + cfg.Database + "?charset=" + cfg.Charset + "&parseTime=true&loc=Local"
	db, err := sql.Open(cfg.Driver, source)
	if err != nil {
		(&service.Logs{}).Error(err)
		self.Print("[Model] Conn:", err)
		return nil
	}
	// 是否成功
	if err := db.Ping(); err != nil {
		db.Close()
		(&service.Logs{}).Error(err)
		self.Print("[Model] Conn:", err)
		return nil
	}
	// 数据池
	db.SetMaxIdleConns(cfg.Min)
	db.SetMaxOpenConns(cfg.Max)
	db.SetConnMaxLifetime(time.Second * time.Duration(cfg.Time))
	return db
}

/* 关闭 */
func (db *Model) Close() {
	if db.conn != nil {
		if err := db.conn.Close(); err != nil {
			(&service.Logs{}).Error(err)
		}
		db.conn = nil
	}
}

/* 查询 */
func (self *Model) Query(sql string, args []interface{}) (*sql.Rows, error) {
	if sql == "" {
		self.Print("[Model] Query: SQL不能为空!")
		return nil, nil
	}
	self.conn = self.Conn()
	if self.conn == nil {
		return nil, nil
	}
	rows, err := self.conn.Query(sql, args...)
	if err != nil {
		self.Print("[Model] Query:", sql)
		(&service.Logs{}).Error(err)
		defer rows.Close()
	}
	return rows, err
}

/* 执行 */
func (self *Model) Exec(sql string, args []interface{}) (sql.Result, error) {
	if sql == "" {
		fmt.Println("[Model] Exec: SQL不能为空!")
		return nil, nil
	}
	self.conn = self.Conn()
	if self.conn == nil {
		return nil, nil
	}
	rows, err := self.conn.Exec(sql, args...)
	self.args = make([]interface{}, 0, 10)
	if err != nil {
		self.Print("[Model] Query:", sql)
		(&service.Logs{}).Error(err)
	}
	return rows, err
}

/* 获取-SQL */
func (db *Model) GetSql() string {
	return db.sql
}

/* 表 */
func (db *Model) Table(table ...string) *Model {
	db.table = ""
	for _, v := range table {
		db.table += v
	}
	db.Conn()
	return db
}

/* 关联-INNER */
func (db *Model) Join(table string, on string) *Model {
	db.table += " INNER JOIN " + table + " ON " + on
	return db
}

/* 关联-LEFT */
func (db *Model) LeftJoin(table string, on string) *Model {
	db.table += " LEFT JOIN " + table + " ON " + on
	return db
}

/* 关联-RIGHT */
func (db *Model) RightJoin(table string, on string) *Model {
	db.table += " RIGHT JOIN " + table + " ON " + on
	return db
}

/* 关联-FULL */
func (db *Model) FullJoin(table string, on string) *Model {
	db.table += " FULL JOIN " + table + " ON " + on
	return db
}

/* 字段 */
func (db *Model) Columns(columns ...string) *Model {
	db.columns = ""
	for _, v := range columns {
		db.columns += v + ", "
	}
	if db.columns != "" {
		db.columns = db.columns[:len(db.columns)-2]
	}
	return db
}

/* 条件 */
func (db *Model) Where(where string, values ...interface{}) *Model {
	db.where = where
	for _, v := range values {
		db.args = append(db.args, v)
	}
	return db
}

/* 限制 */
func (db *Model) Limit(start int, limit int) *Model {
	db.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
	return db
}

/* 排序 */
func (db *Model) Order(order ...string) *Model {
	db.order = ""
	for _, v := range order {
		db.order += v + ","
	}
	if db.order != "" {
		db.order = db.order[:len(db.order)-1]
	}
	return db
}

/* 分组 */
func (db *Model) Group(group ...string) *Model {
	db.order = ""
	for _, v := range group {
		db.group += v + ","
	}
	if db.group != "" {
		db.group = db.group[:len(db.group)-1]
	}
	return db
}

/* 分页 */
func (db *Model) Page(page int, limit int) *Model {
	start := (page - 1) * limit
	db.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
	return db
}

/* 查询-SQL */
func (db *Model) SelectSql() (string, []interface{}) {
	if db.table == "" || db.columns == "" {
		fmt.Println("Model[Select]: 数据表、字段不能为空!")
		return "", nil
	}
	// 合成
	db.sql = "SELECT " + db.columns + " FROM " + db.table
	if db.where != "" {
		db.sql += " WHERE " + db.where
		db.where = ""
	}
	if db.order != "" {
		db.sql += " ORDER BY " + db.order
		db.order = ""
	}
	if db.group != "" {
		db.sql += " GROUP BY " + db.group
		db.group = ""
	}
	if db.limit != "" {
		db.sql += " LIMIT " + db.limit
		db.limit = ""
	}
	args := db.args
	db.args = make([]interface{}, 0, 10)
	return db.sql, args
}

/* 查询-多条 */
func (db *Model) Find() []interface{} {
	sql, args := db.SelectSql()
	rows, _ := db.Query(sql, args)
	if rows == nil {
		return nil
	}
	return db.FindDataAll(rows)
}

/* 查询-单条 */
func (db *Model) FindFirst() interface{} {
	db.limit = "0,1"
	sql, args := db.SelectSql()
	rows, _ := db.Query(sql, args)
	if rows == nil {
		return nil
	}
	return db.FindDataOne(rows)
}

/* 获取查询结果 */
func (db *Model) FindDataOne(rows *sql.Rows) interface{} {
	res := db.FindDataAll(rows)
	return res[0]
}
func (db *Model) FindDataAll(rows *sql.Rows) []interface{} {
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
				tmp[columns[k]] = util.Strval(v)
			} else {
				tmp[columns[k]] = ""
			}
		}
		res = append(res, tmp)
		i++
	}
	return res
}

/* 添加-数据 */
func (db *Model) Values(data map[string]interface{}) *Model {
	keys, vals := "", ""
	db.args = make([]interface{}, 0, 10)
	for k, v := range data {
		keys += k + ", "
		vals += "?, "
		db.args = append(db.args, v)
	}
	if len(data) > 0 {
		keys = keys[:len(keys)-2]
		vals = vals[:len(vals)-2]
	}
	db.keys = keys
	db.values = vals
	return db
}

/* 添加-SQL */
func (db *Model) InsertSql() (string, []interface{}) {
	if db.table == "" || db.keys == "" || db.values == "" {
		fmt.Println("Model[Insert]: 数据表、数据不能为空!")
		return "", nil
	}
	db.sql = "INSERT INTO `" + db.table + "`(" + db.keys + ") values(" + db.values + ")"
	args := db.args
	db.args = make([]interface{}, 0, 10)
	return db.sql, args
}

/* 添加-执行 */
func (db *Model) Insert() (sql.Result, error) {
	sql, args := db.InsertSql()
	rows, err := db.Exec(sql, args)
	return rows, err
}

/* 更新-数据 */
func (db *Model) Set(data map[string]interface{}) *Model {
	db.args = make([]interface{}, 0, 10)
	vals := ""
	for k, v := range data {
		vals += k + "=?, "
		db.args = append(db.args, v)
	}
	if len(data) > 0 {
		vals = vals[:len(vals)-2]
	}
	db.data = vals
	return db
}

/* 更新-SQL */
func (db *Model) UpdateSql() (string, []interface{}) {
	if db.table == "" || db.data == "" || db.where == "" {
		fmt.Println("Model[Update]: 数据表、数据、条件不能为空!")
		return "", nil
	}
	db.sql = "UPDATE `" + db.table + "` SET " + db.data + " WHERE " + db.where
	args := db.args
	db.args = make([]interface{}, 0, 10)
	return db.sql, args
}

/* 更新-执行 */
func (db *Model) Update() (sql.Result, error) {
	sql, args := db.UpdateSql()
	rows, err := db.Exec(sql, args)
	return rows, err
}

/* 删除-SQL */
func (db *Model) DeleteSql() (string, []interface{}) {
	if db.table == "" || db.where == "" {
		fmt.Println("Model[Delete]: 数据表、条件不能为空!")
		return "", nil
	}
	db.sql = "DELETE FROM `" + db.table + "` WHERE " + db.where
	args := db.args
	db.args = make([]interface{}, 0, 10)
	return db.sql, args
}

/* 删除-执行 */
func (db *Model) Delete() (sql.Result, error) {
	sql, args := db.DeleteSql()
	rows, err := db.Exec(sql, args)
	return rows, err
}
