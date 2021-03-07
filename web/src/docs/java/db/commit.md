### 事务
```go
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
```