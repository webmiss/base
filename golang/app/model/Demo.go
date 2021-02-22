package model

type Demo struct {
	Model
	Table string
}

/* 构造函数 */
func (db *Demo) Init() *Demo {
	db._table = "test"
	db._columns = "uid"
	return db
}

/* 查询 */
func (db *Demo) Find() (interface{}, error) {
	// 数据
	rows, err := db.findFirst()
	data := db.findDataOne(rows)
	// 释放
	rows.Close()
	db._conn.Close()
	return data, err
}
