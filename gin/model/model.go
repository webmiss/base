package model

import (
	"database/sql"
	"fmt"
	"strconv"
	"time"
	"webmis/config"
	"webmis/util"

	_ "github.com/go-sql-driver/mysql"
)

var DBDefault *sql.DB
var DBOther *sql.DB

// Model :数据库
type Model struct {
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

// DBPool :数据池
func DBPool(db string) {
	// 配置
	cfg := (&config.MySQL{}).Default()
	if db == "other" {
		cfg = (&config.MySQL{}).Default()
	}
	// 连接
	source := cfg.User + ":" + cfg.Password + "@(" + cfg.Host + ":" + cfg.Port + ")/" + cfg.Database + "?charset=" + cfg.Charset + "&parseTime=true&loc=Local"
	pool, _ := sql.Open(cfg.Driver, source)
	// 是否成功
	if err := pool.Ping(); err != nil {
		fmt.Println("[Model] Conn:", err)
		return
	}
	// 配置
	pool.SetMaxIdleConns(cfg.Min)
	pool.SetMaxOpenConns(cfg.Max)
	pool.SetConnMaxLifetime(time.Second * time.Duration(cfg.Time))
	// 多数据库
	if db == "other" {
		DBOther = pool
	} else {
		DBDefault = pool
	}
}

// Conn :连接
func (m *Model) Conn(db string) {
	if db == "other" {
		m.conn = DBOther
	} else {
		m.conn = DBDefault
	}
}

// Query :查询
func (m *Model) Query(sql string, args []interface{}) *sql.Rows {
	if sql == "" {
		fmt.Println("[Model] Query: SQL不能为空!")
		return nil
	}
	// 是否连接
	if m.conn == nil {
		return nil
	}
	rows, err := m.conn.Query(sql, args...)
	if err != nil {
		fmt.Println("[Model] Query:", err)
		fmt.Println("[Model] SQL:", sql)
		return nil
	}
	return rows
}

// Exec :执行
func (m *Model) Exec(sql string, args []interface{}) sql.Result {
	if sql == "" {
		fmt.Println("[Model] Exec: SQL不能为空!")
		return nil
	}
	// 是否连接
	if m.conn == nil {
		return nil
	}
	rows, err := m.conn.Exec(sql, args...)
	m.args = make([]interface{}, 0, 10)
	if err != nil {
		fmt.Println("[Model] Exec:", err)
		fmt.Println("[Model] SQL:", sql)
		return nil
	}
	return rows
}

// GetSQL :获取-SQL
func (m *Model) GetSQL() string {
	return m.sql
}

// Table :表
func (m *Model) Table(table string) {
	m.table = table
}

// Join :关联-INNER
func (m *Model) Join(table string, on string) {
	m.table += " INNER JOIN " + table + " ON " + on
}

// LeftJoin :关联-LEFT
func (m *Model) LeftJoin(table string, on string) {
	m.table += " LEFT JOIN " + table + " ON " + on
}

// RightJoin :关联-RIGHT
func (m *Model) RightJoin(table string, on string) {
	m.table += " RIGHT JOIN " + table + " ON " + on
}

// FullJoin :关联-FULL
func (m *Model) FullJoin(table string, on string) {
	m.table += " FULL JOIN " + table + " ON " + on
}

// Columns :字段
func (m *Model) Columns(columns ...string) {
	m.columns = ""
	for _, v := range columns {
		m.columns += v + ", "
	}
	if m.columns != "" {
		m.columns = m.columns[:len(m.columns)-2]
	}
}

// Where :条件
func (m *Model) Where(where string, values ...interface{}) {
	m.where = where
	for _, v := range values {
		m.args = append(m.args, v)
	}
}

// Limit :限制
func (m *Model) Limit(start int, limit int) {
	m.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
}

// Order :排序
func (m *Model) Order(order ...string) {
	m.order = ""
	for _, v := range order {
		m.order += v + ","
	}
	if m.order != "" {
		m.order = m.order[:len(m.order)-1]
	}
}

// Group :分组
func (m *Model) Group(group ...string) {
	m.order = ""
	for _, v := range group {
		m.group += v + ","
	}
	if m.group != "" {
		m.group = m.group[:len(m.group)-1]
	}
}

// Page :分页
func (m *Model) Page(page int, limit int) {
	start := (page - 1) * limit
	m.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
}

// SelectSQL :查询-SQL
func (m *Model) SelectSQL() (string, []interface{}) {
	if m.table == "" {
		fmt.Println("[Model] Select: 表不能为空!")
		return "", nil
	}
	if m.columns == "" {
		fmt.Println("[Model] Select: 字段不能为空!")
		return "", nil
	}
	// 合成
	m.sql = "SELECT " + m.columns + " FROM " + m.table
	if m.where != "" {
		m.sql += " WHERE " + m.where
		m.where = ""
	}
	if m.order != "" {
		m.sql += " ORDER BY " + m.order
		m.order = ""
	}
	if m.group != "" {
		m.sql += " GROUP BY " + m.group
		m.group = ""
	}
	if m.limit != "" {
		m.sql += " LIMIT " + m.limit
		m.limit = ""
	}
	args := m.args
	m.args = make([]interface{}, 0, 10)
	return m.sql, args
}

// Find :查询-多条
func (m *Model) Find() []map[string]interface{} {
	sql, args := m.SelectSQL()
	if sql == "" {
		return nil
	}
	rows := m.Query(sql, args)
	if rows == nil {
		return nil
	}
	return m.FindDataAll(rows)
}

// FindFirst :查询-单条
func (m *Model) FindFirst() map[string]interface{} {
	m.limit = "0,1"
	sql, args := m.SelectSQL()
	if sql == "" {
		return nil
	}
	rows := m.Query(sql, args)
	if rows == nil {
		return nil
	}
	return m.FindDataOne(rows)
}

// FindDataOne :获取查询结果-单条
func (m *Model) FindDataOne(rows *sql.Rows) map[string]interface{} {
	res := m.FindDataAll(rows)
	if len(res) == 0 {
		return nil
	}
	return res[0]
}

// FindDataAll :获取查询结果-多条
func (m *Model) FindDataAll(rows *sql.Rows) []map[string]interface{} {
	// 字段长度
	columns, _ := rows.Columns()
	key := make([]interface{}, len(columns))
	val := make([]interface{}, len(columns))
	for n := range val {
		key[n] = &val[n]
	}
	// 数据处理
	var i int = 0
	res := make([]map[string]interface{}, 0, 10)
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
	defer rows.Close()
	return res
}

// Values :添加-数据
func (m *Model) Values(data map[string]interface{}) {
	keys, vals := "", ""
	m.args = make([]interface{}, 0, 10)
	for k, v := range data {
		keys += k + ", "
		vals += "?, "
		m.args = append(m.args, v)
	}
	if len(data) > 0 {
		keys = keys[:len(keys)-2]
		vals = vals[:len(vals)-2]
	}
	m.keys = keys
	m.values = vals
}

// InsertSQL :添加-SQL
func (m *Model) InsertSQL() (string, []interface{}) {
	if m.table == "" {
		fmt.Println("[Model] Insert: 表不能为空!")
		return "", nil
	}
	if m.keys == "" || m.values == "" {
		fmt.Println("[Model] Insert: 数据不能为空!")
		return "", nil
	}
	m.sql = "INSERT INTO `" + m.table + "`(" + m.keys + ") values(" + m.values + ")"
	args := m.args
	// 重置
	m.keys = ""
	m.values = ""
	m.args = make([]interface{}, 0, 10)
	return m.sql, args
}

// Insert :添加-执行
func (m *Model) Insert() int64 {
	sql, args := m.InsertSQL()
	if sql == "" {
		return 0
	}
	rows := m.Exec(sql, args)
	if rows == nil {
		return 0
	}
	id, err := rows.LastInsertId()
	if err != nil {
		return 0
	}
	return id
}

// Set :更新-数据
func (m *Model) Set(data map[string]interface{}) {
	m.args = make([]interface{}, 0, 10)
	vals := ""
	for k, v := range data {
		vals += k + "=?, "
		m.args = append(m.args, v)
	}
	if len(data) > 0 {
		vals = vals[:len(vals)-2]
	}
	m.data = vals
}

// UpdateSQL :更新-SQL
func (m *Model) UpdateSQL() (string, []interface{}) {
	if m.table == "" {
		fmt.Println("[Model] Update: 表不能为空!")
		return "", nil
	}
	if m.data == "" {
		fmt.Println("[Model] Update: 数据不能为空!")
		return "", nil
	}
	if m.where == "" {
		fmt.Println("[Model] Update: 条件不能为空!")
		return "", nil
	}
	m.sql = "UPDATE `" + m.table + "` SET " + m.data + " WHERE " + m.where
	args := m.args
	// 重置
	m.data = ""
	m.where = ""
	m.args = make([]interface{}, 0, 10)
	return m.sql, args
}

// Update :更新-执行
func (m *Model) Update() int64 {
	sql, args := m.UpdateSQL()
	if sql == "" {
		return 0
	}
	rows := m.Exec(sql, args)
	if rows == nil {
		return 0
	}
	num, err := rows.RowsAffected()
	if err != nil {
		return 0
	}
	return num
}

// DeleteSQL :删除-SQL
func (m *Model) DeleteSQL() (string, []interface{}) {
	if m.table == "" {
		fmt.Println("[Model] Delete: 表不能为空!")
		return "", nil
	}
	if m.where == "" {
		fmt.Println("[Model] Delete: 条件不能为空!")
		return "", nil
	}
	m.sql = "DELETE FROM `" + m.table + "` WHERE " + m.where
	args := m.args
	// 重置
	m.where = ""
	m.args = make([]interface{}, 0, 10)
	return m.sql, args
}

// Delete :删除-执行
func (m *Model) Delete() int64 {
	sql, args := m.DeleteSQL()
	if sql == "" {
		return 0
	}
	rows := m.Exec(sql, args)
	if rows == nil {
		return 0
	}
	num, err := rows.RowsAffected()
	if err != nil {
		return 0
	}
	return num
}
