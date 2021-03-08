package model

import (
	"database/sql"
	"fmt"
	"strconv"
	"time"
	"webmis/base"
	"webmis/config"
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
	// 是否连接
	if self.conn != nil {
		return self.conn
	}
	// 连接
	cfg := (&config.MySql{}).Config()
	source := cfg.User + ":" + cfg.Password + "@(" + cfg.Host + ":" + cfg.Port + ")/" + cfg.Database + "?charset=" + cfg.Charset + "&parseTime=true&loc=Local"
	db, _ := sql.Open(cfg.Driver, source)
	// 是否成功
	if err := db.Ping(); err != nil {
		self.Print("[Model] Conn:", err)
		self.LogsErr(err)
		return nil
	}
	// 数据池
	self.conn = db
	self.conn.SetMaxIdleConns(cfg.Min)
	self.conn.SetMaxOpenConns(cfg.Max)
	self.conn.SetConnMaxLifetime(time.Second * time.Duration(cfg.Time))
	return self.conn
}

/* 关闭 */
func (self *Model) Close() {
	if self.conn != nil {
		if err := self.conn.Close(); err != nil {
			self.Print("[Model] Close:", err)
			self.LogsErr(err)
		}
	}
}

/* 查询 */
func (self *Model) Query(sql string, args []interface{}) (*sql.Rows, error) {
	if sql == "" {
		self.Print("[Model] Query: SQL不能为空!")
		return nil, nil
	}
	// 是否连接
	if conn := self.Conn(); conn == nil {
		return nil, nil
	}
	rows, err := self.conn.Query(sql, args...)
	if err != nil {
		self.Print("[Model] Query:", sql)
		self.LogsErr(err)
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
	// 是否连接
	if conn := self.Conn(); conn == nil {
		return nil, nil
	}
	rows, err := self.conn.Exec(sql, args...)
	self.args = make([]interface{}, 0, 10)
	if err != nil {
		self.Print("[Model] Query:", sql)
		self.LogsErr(err)
	}
	return rows, err
}

/* 获取-SQL */
func (self *Model) GetSql() string {
	return self.sql
}

/* 表 */
func (self *Model) Table(table ...string) {
	self.table = ""
	for _, v := range table {
		self.table += v
	}
	self.Conn()
}

/* 关联-INNER */
func (self *Model) Join(table string, on string) {
	self.table += " INNER JOIN " + table + " ON " + on
}

/* 关联-LEFT */
func (self *Model) LeftJoin(table string, on string) {
	self.table += " LEFT JOIN " + table + " ON " + on
}

/* 关联-RIGHT */
func (self *Model) RightJoin(table string, on string) {
	self.table += " RIGHT JOIN " + table + " ON " + on
}

/* 关联-FULL */
func (self *Model) FullJoin(table string, on string) {
	self.table += " FULL JOIN " + table + " ON " + on
}

/* 字段 */
func (self *Model) Columns(columns ...string) {
	self.columns = ""
	for _, v := range columns {
		self.columns += v + ", "
	}
	if self.columns != "" {
		self.columns = self.columns[:len(self.columns)-2]
	}
}

/* 条件 */
func (self *Model) Where(where string, values ...interface{}) {
	self.where = where
	for _, v := range values {
		self.args = append(self.args, v)
	}
}

/* 限制 */
func (self *Model) Limit(start int, limit int) {
	self.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
}

/* 排序 */
func (self *Model) Order(order ...string) {
	self.order = ""
	for _, v := range order {
		self.order += v + ","
	}
	if self.order != "" {
		self.order = self.order[:len(self.order)-1]
	}
}

/* 分组 */
func (self *Model) Group(group ...string) {
	self.order = ""
	for _, v := range group {
		self.group += v + ","
	}
	if self.group != "" {
		self.group = self.group[:len(self.group)-1]
	}
}

/* 分页 */
func (self *Model) Page(page int, limit int) {
	start := (page - 1) * limit
	self.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
}

/* 查询-SQL */
func (self *Model) SelectSql() (string, []interface{}) {
	if self.table == "" || self.columns == "" {
		self.Print("[Model] Select: 数据表、字段不能为空!")
		return "", nil
	}
	// 合成
	self.sql = "SELECT " + self.columns + " FROM " + self.table
	if self.where != "" {
		self.sql += " WHERE " + self.where
		self.where = ""
	}
	if self.order != "" {
		self.sql += " ORDER BY " + self.order
		self.order = ""
	}
	if self.group != "" {
		self.sql += " GROUP BY " + self.group
		self.group = ""
	}
	if self.limit != "" {
		self.sql += " LIMIT " + self.limit
		self.limit = ""
	}
	args := self.args
	self.args = make([]interface{}, 0, 10)
	return self.sql, args
}

/* 查询-多条 */
func (self *Model) Find() []interface{} {
	sql, args := self.SelectSql()
	rows, _ := self.Query(sql, args)
	if rows == nil {
		return nil
	}
	return self.FindDataAll(rows)
}

/* 查询-单条 */
func (self *Model) FindFirst() interface{} {
	self.limit = "0,1"
	sql, args := self.SelectSql()
	rows, _ := self.Query(sql, args)
	if rows == nil {
		return nil
	}
	return self.FindDataOne(rows)
}

/* 获取查询结果 */
func (self *Model) FindDataOne(rows *sql.Rows) interface{} {
	res := self.FindDataAll(rows)
	return res[0]
}
func (self *Model) FindDataAll(rows *sql.Rows) []interface{} {
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
func (self *Model) Values(data map[string]interface{}) {
	keys, vals := "", ""
	self.args = make([]interface{}, 0, 10)
	for k, v := range data {
		keys += k + ", "
		vals += "?, "
		self.args = append(self.args, v)
	}
	if len(data) > 0 {
		keys = keys[:len(keys)-2]
		vals = vals[:len(vals)-2]
	}
	self.keys = keys
	self.values = vals
}

/* 添加-SQL */
func (self *Model) InsertSql() (string, []interface{}) {
	if self.table == "" || self.keys == "" || self.values == "" {
		fmt.Println("[Model] Insert: 数据表、数据不能为空!")
		return "", nil
	}
	self.sql = "INSERT INTO `" + self.table + "`(" + self.keys + ") values(" + self.values + ")"
	args := self.args
	self.args = make([]interface{}, 0, 10)
	return self.sql, args
}

/* 添加-执行 */
func (self *Model) Insert() (sql.Result, error) {
	sql, args := self.InsertSql()
	rows, err := self.Exec(sql, args)
	return rows, err
}

/* 更新-数据 */
func (self *Model) Set(data map[string]interface{}) {
	self.args = make([]interface{}, 0, 10)
	vals := ""
	for k, v := range data {
		vals += k + "=?, "
		self.args = append(self.args, v)
	}
	if len(data) > 0 {
		vals = vals[:len(vals)-2]
	}
	self.data = vals
}

/* 更新-SQL */
func (self *Model) UpdateSql() (string, []interface{}) {
	if self.table == "" || self.data == "" || self.where == "" {
		self.Print("[Model] Update: 数据表、数据、条件不能为空!")
		return "", nil
	}
	self.sql = "UPDATE `" + self.table + "` SET " + self.data + " WHERE " + self.where
	args := self.args
	self.args = make([]interface{}, 0, 10)
	return self.sql, args
}

/* 更新-执行 */
func (self *Model) Update() (sql.Result, error) {
	sql, args := self.UpdateSql()
	rows, err := self.Exec(sql, args)
	return rows, err
}

/* 删除-SQL */
func (self *Model) DeleteSql() (string, []interface{}) {
	if self.table == "" || self.where == "" {
		self.Print("[Model] Delete: 数据表、条件不能为空!")
		return "", nil
	}
	self.sql = "DELETE FROM `" + self.table + "` WHERE " + self.where
	args := self.args
	self.args = make([]interface{}, 0, 10)
	return self.sql, args
}

/* 删除-执行 */
func (self *Model) Delete() (sql.Result, error) {
	sql, args := self.DeleteSql()
	rows, err := self.Exec(sql, args)
	return rows, err
}
