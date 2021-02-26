package model

import (
	"database/sql"
	"fmt"
	util "webmis/library"
)

type Demo struct {
	Model
}

/* 字段 */
type Columns struct {
	Uid   int           `json:"uid"`
	Title string        `json:"title_rename"`
	Ctime util.JsonTime `json:"ctime"`
}

/* 初始化 */
func (db *Demo) Init() *Demo {
	db.Table("test")
	return db
}

/* 查询 */
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

/* 查询-多条、单条 */
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

/* 插入 */
func (db *Demo) InsertRow() int64 {
	var uid sql.NullInt64
	db.Values(map[string]interface{}{
		"uid":   uid,
		"title": "添加",
	})
	rows, _ := db.Insert()
	id, _ := rows.LastInsertId()
	return id
}

/* 更新 */
func (db *Demo) UpdateRow() bool {
	db.Set(map[string]interface{}{
		"title": "更新1",
	})
	db.Where("uid=?", 1)
	db.Update()
	return true
}

/* 删除 */
func (db *Demo) DeleteRow() bool {
	db.Where("uid>?", 1)
	db.Delete()
	return true
}

/* 连表 */
func (db *Demo) Join() {
	db.Table("test1 as a")
	db.LeftJoin("test2 as b", "a.id=b.uid")
	db.Columns("a.title", "b.name")
	sql, args := db.SelectSql()
	fmt.Println(sql, args)
}

/* 事务 */
func (db *Demo) Commit() {
	// 开始
	tx, err := db.Conn().Begin()
	if err != nil {
		fmt.Println("开始: ", err)
	}
	// SQL1
	var uid sql.NullInt64
	db.Values(map[string]interface{}{
		"uid":   uid,
		"title": "事务",
	})
	sql1, args1 := db.InsertSql()
	_, err = tx.Exec(sql1, args1...)
	if err != nil {
		tx.Rollback()
		fmt.Println("事务1: ", err)
	}
	// SQL2
	db.Set(map[string]interface{}{
		"title": "事务Update",
	})
	db.Where("uid=?", 1)
	sql2, args2 := db.UpdateSql()
	_, err = tx.Exec(sql2, args2...)
	if err != nil {
		tx.Rollback()
		fmt.Println("事务2: ", err)
	}
	// SQL3
	db.Where("uid=?", 1)
	sql3, args3 := db.DeleteSql()
	_, err = tx.Exec(sql3, args3...)
	if err != nil {
		tx.Rollback()
		fmt.Println("事务3: ", err)
	}
	// 提交
	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		fmt.Println("事务提交: ", err)
	}
}
