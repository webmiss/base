### 插入
```go
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
```

### 获取SQL
```go
db.InsertSql()
```