### 删除
```go
func (db *Demo) DeleteRow() bool {
	db.Where("uid>?", 1)
	db.Delete()
	return true
}
```

### 获取SQL
```go
db.DeleteSql()
```