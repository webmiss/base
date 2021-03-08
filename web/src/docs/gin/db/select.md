### 执行SQL
```go
func Index(c *gin.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	demo.Columns("uid", "title")
	demo.Where("title LIKE ?", "%事务%")
	// 执行
	sql, args := demo.SelectSql()
	rows, _ := demo.Query(sql, args)
	defer rows.close()
	// 数据
	var uid int
	var title string
	data := make([]map[string]interface{}, 0, 10)
	for rows.Next() {
		rows.Scan(&uid, &title)
		tmp := map[string]interface{}{
			"uid":   uid,
			"title": title,
		}
		data = append(data, tmp)
	}
	// 关闭
	demo.Close()
	// 返回
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": data})
}
```

### 多条
```go
data := demo.Find()
```

### 单条
```go
data := demo.FindFirst()
```

### 生成SQL
```go
sql,args := db.SelectSql()
```