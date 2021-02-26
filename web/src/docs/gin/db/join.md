### 连表
```go
func (db *Demo) Join() {
	db.Table("test1 as a")
	db.LeftJoin("test2 as b", "a.id=b.uid")
	db.Columns("a.title", "b.name")
	sql, args := db.SelectSql()
	fmt.Println(sql, args)
}
```

### 其他
```go
// INNER JOIN 
db.Join()
// LEFT JOIN
db.LeftJoin()
// RIGHT JOIN
db.RightJoin()
// FULL JOIN
db.FullJoin()
```