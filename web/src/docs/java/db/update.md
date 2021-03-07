### 更新
```go
func (db *Demo) UpdateRow() bool {
	db.Set(map[string]interface{}{
		"title": "更新1",
	})
	db.Where("uid=?", 1)
	db.Update()
	return true
}
```

### 获取SQL
```go
db.UpdateSql()
```