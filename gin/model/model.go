package model

import (
	"database/sql"
	"fmt"
	"strconv"
	"strings"
	"time"
	"webmis/config"
	"webmis/util"

	_ "github.com/go-sql-driver/mysql"
)

var DBDefault *sql.DB //默认池
var DBOther *sql.DB   //其它池

/* 数据库 */
type Model struct {
	sql         string            //SQL
	db          string            //数据库
	table       string            //数据表
	columns     string            //字段
	where       string            //条件
	group       string            //分组
	order       string            //排序
	limit       string            //限制
	args        []interface{}     //参数
	keys        string            //新增-名
	values      string            //新增-值
	data        string            //更新-数据
	id          int64             //自增ID
	nums        int64             //条数
	columnsType map[string]string //字段类型
}

/* 连接 */
func (m *Model) DBConn() *sql.DB {
	var conn *sql.DB
	if m.db == "other" {
		if DBOther == nil {
			DBOther = m.DBPool((&config.MySQL{}).Other())
		}
		conn = DBOther
	} else {
		if DBDefault == nil {
			DBDefault = m.DBPool((&config.MySQL{}).Default())
		}
		conn = DBDefault
	}
	return conn
}

/* 连接池 */
func (m *Model) DBPool(cfg *config.MySQL) *sql.DB {
	// 配置
	source := cfg.User + ":" + cfg.Password + "@(" + cfg.Host + ":" + cfg.Port + ")/" + cfg.Database + "?charset=" + cfg.Charset + "&parseTime=true&loc=Local"
	pool, _ := sql.Open(cfg.Driver, source)
	// 是否成功
	if err := pool.Ping(); err != nil {
		fmt.Println("[Model] Conn:", err)
		return nil
	}
	// 配置
	pool.SetMaxIdleConns(cfg.Min)
	pool.SetMaxOpenConns(cfg.Max)
	pool.SetConnMaxLifetime(time.Second * time.Duration(cfg.Time))
	return pool
}

/* 查询 */
func (Model) Query(conn *sql.DB, sql string, args []interface{}) *sql.Rows {
	if sql == "" {
		fmt.Println("[Model] Query: SQL不能为空!")
		return nil
	}
	rows, err := conn.Query(sql, args...)
	if err != nil {
		fmt.Println("[Model] Query:", err)
		fmt.Println("[Model] SQL:", sql)
		return nil
	}
	return rows
}

/* 执行 */
func (Model) Exec(conn *sql.DB, sql string, args []interface{}) sql.Result {
	if sql == "" {
		fmt.Println("[Model] Exec: SQL不能为空!")
		return nil
	}
	rs, err := conn.Exec(sql, args...)
	if err != nil {
		fmt.Println("[Model] Exec:", err)
		fmt.Println("[Model] SQL:", sql)
		return nil
	}
	return rs
}

/* 获取-SQL */
func (m *Model) GetSQL() string {
	return m.sql
}

/* 获取-自增ID */
func (m *Model) GetID() int64 {
	return m.id
}

/* 获取-条数 */
func (m *Model) GetNums() int64 {
	return m.nums
}

/* 数据库 */
func (m *Model) Db(db string) {
	m.db = db
}

/* 表 */
func (m *Model) Table(table string) {
	m.table = table
}

/* 关联-INNER */
func (m *Model) Join(table string, on string) {
	m.table += " INNER JOIN " + table + " ON " + on
}

/* 关联-LEFT */
func (m *Model) LeftJoin(table string, on string) {
	m.table += " LEFT JOIN " + table + " ON " + on
}

/* 关联-RIGHT */
func (m *Model) RightJoin(table string, on string) {
	m.table += " RIGHT JOIN " + table + " ON " + on
}

/* 关联-FULL */
func (m *Model) FullJoin(table string, on string) {
	m.table += " FULL JOIN " + table + " ON " + on
}

/* 字段 */
func (m *Model) Columns(columns ...string) {
	m.columns = util.Implode(", ", columns)
}

/* 字段-返回类型 */
func (m *Model) ResType(tp map[string]string) {
	m.columnsType = tp
}

/* 条件 */
func (m *Model) Where(where string, values ...interface{}) {
	m.where = where
	m.args = append(m.args, values...)
}

/* 限制 */
func (m *Model) Limit(start int, limit int) {
	m.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
}

/* 排序 */
func (m *Model) Order(order ...string) {
	m.order = util.Implode(", ", order)
}

/* 分组 */
func (m *Model) Group(group ...string) {
	m.group = util.Implode(", ", group)
}

/* 分页 */
func (m *Model) Page(page int, limit int) {
	start := (page - 1) * limit
	m.limit = strconv.Itoa(start) + "," + strconv.Itoa(limit)
}

/* 查询-SQL */
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
	if m.group != "" {
		m.sql += " GROUP BY " + m.group
		m.group = ""
	}
	if m.order != "" {
		m.sql += " ORDER BY " + m.order
		m.order = ""
	}
	if m.limit != "" {
		m.sql += " LIMIT " + m.limit
		m.limit = ""
	}
	args := m.args
	m.args = make([]interface{}, 0, 10)
	return m.sql, args
}

/* 查询-多条 */
func (m Model) Find() []map[string]interface{} {
	sql, args := m.SelectSQL()
	conn := m.DBConn()
	rows := m.Query(conn, sql, args)
	if rows == nil {
		return nil
	}
	return m.FindDataAll(rows)
}

/* 查询-单条 */
func (m *Model) FindFirst() map[string]interface{} {
	m.limit = "0,1"
	sql, args := m.SelectSQL()
	conn := m.DBConn()
	rows := m.Query(conn, sql, args)
	if rows == nil {
		return nil
	}
	res := m.FindDataAll(rows)
	if len(res) == 0 {
		return nil
	}
	return res[0]
}

/* 获取查询结果-多条 */
func (m *Model) FindDataAll(rows *sql.Rows) []map[string]interface{} {
	// 字段长度
	columns, _ := rows.Columns()
	key := make([]interface{}, len(columns))
	val := make([]interface{}, len(columns))
	for n := range key {
		key[n] = &val[n]
	}
	// 数据处理
	var i int = 0
	res := []map[string]interface{}{}
	for rows.Next() {
		rows.Scan(key...)
		item := map[string]interface{}{}
		for k, v := range val {
			if tp, ok := m.columnsType[columns[k]]; ok {
				// 转换类型
				item[columns[k]] = (&util.Type{}).ToType(tp, v)
			} else {
				// 默认字符型
				item[columns[k]] = (&util.Type{}).Strval(v)
			}
		}
		res = append(res, item)
		i++
	}
	m.columnsType = map[string]string{}
	defer rows.Close()
	return res
}

/* 添加-单条 */
func (m *Model) Values(data map[string]interface{}) {
	keys, vals := []string{}, []string{}
	m.args = []interface{}{}
	for k, v := range data {
		keys = append(keys, k)
		vals = append(vals, "?")
		m.args = append(m.args, v)
	}
	m.keys = util.Implode(", ", keys)
	m.values = "(" + util.Implode(", ", vals) + ")"
}

/* 添加-多条 */
func (m *Model) ValuesAll(data []map[string]interface{}) {
	keys, vals, alls := []string{}, []string{}, []string{}
	m.args = []interface{}{}
	for k := range data[0] {
		keys = append(keys, k)
		vals = append(vals, "?")
	}
	for i := range data {
		for _, k := range keys {
			m.args = append(m.args, data[i][k])
		}
		alls = append(alls, "("+util.Implode(", ", vals)+")")
	}
	m.keys = util.Implode(",", keys)
	m.values = util.Implode(", ", alls)
}

/* 添加-SQL */
func (m *Model) InsertSQL() (string, []interface{}) {
	if m.table == "" {
		fmt.Println("[Model] Insert: 表不能为空!")
		return "", nil
	}
	if m.keys == "" || m.values == "" {
		fmt.Println("[Model] Insert: 数据不能为空!")
		return "", nil
	}
	m.sql = "INSERT INTO `" + m.table + "`(" + m.keys + ") VALUES " + m.values
	args := m.args
	// 重置
	m.keys = ""
	m.values = ""
	m.args = []interface{}{}
	return m.sql, args
}

/* 添加-执行 */
func (m *Model) Insert() bool {
	sql, args := m.InsertSQL()
	if sql == "" {
		return false
	}
	conn := m.DBConn()
	rs := m.Exec(conn, sql, args)
	if rs == nil {
		return false
	}
	id, err := rs.LastInsertId()
	if err != nil {
		return false
	}
	m.id = id
	return true
}

/* 添加-自增ID */
func (m *Model) LastInsertId(rs sql.Result) int64 {
	id, err := rs.LastInsertId()
	if err != nil {
		return 0
	}
	return id
}

/* 更新-数据 */
func (m *Model) Set(data map[string]interface{}) {
	vals := ""
	m.args = []interface{}{}
	for k, v := range data {
		vals += k + "=?, "
		m.args = append(m.args, v)
	}
	m.data = strings.TrimRight(vals, ", ")
}

/* 更新-SQL */
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
	m.args = []interface{}{}
	return m.sql, args
}

/* 更新-执行 */
func (m *Model) Update() bool {
	sql, args := m.UpdateSQL()
	conn := m.DBConn()
	rs := m.Exec(conn, sql, args)
	if rs == nil {
		return false
	}
	num, err := rs.RowsAffected()
	if err != nil {
		return false
	}
	m.nums = num
	return true
}

/* 删除-SQL */
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
	m.args = []interface{}{}
	return m.sql, args
}

/* 删除-执行 */
func (m *Model) Delete() bool {
	sql, args := m.DeleteSQL()
	conn := m.DBConn()
	rs := m.Exec(conn, sql, args)
	if rs == nil {
		return false
	}
	num, err := rs.RowsAffected()
	if err != nil {
		return false
	}
	m.nums = num
	return true
}
