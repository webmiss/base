### 查询SQL
```go
type Columns struct {
	Uid   int           `json:"uid"`
	Title string        `json:"title_rename"`
	Ctime util.JsonTime `json:"ctime"`
}
func (db *Demo) SelectRow() []interface{} {
	// SQL
	db.Columns("uid", "title", "ctime")
	db.Where("uid>? OR title=?", 1, "测试")
	db.Limit(0, 2)
	db.Order("uid DESC")
	// rows, _ := db.FindList()	//返回执行结构
	sql, args := db.SelectSql() //返回Sql语句、参数值
	// 执行
	rows, _ := db.Conn().Query(sql, args...)
	defer rows.Close()
	// 合成数据
	list := Columns{}
	columns, _ := rows.Columns()
	fmt.Println(columns)
	data := make([]interface{}, 0, 10)
	for rows.Next() {
		rows.Scan(&list.Uid, &list.Title, &list.Ctime)
		data = append(data, list)
	}
	return data
}
```

### 多条、单条
```go
func (db *Demo) FindRow() []interface{} {
	db.Columns("uid", "title", "ctime")
	rows, _ := db.Find()
	defer rows.Close()
	// 合成数据
	data := db.findDataAll(rows)
	// 单条
	// rows, err := db.FindOne()
	// data := db.findDataOne(rows)
	fmt.Println(data)
	return data
}
```

### 获取SQL
```go
db.SelectSql()
```