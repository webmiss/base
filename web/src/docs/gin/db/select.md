### 查询
```go
func Index(c *gin.Context) {
	// 查询
	model := (&model.Demo{}).New()
	model.Columns("uid", "title")
	model.Where("title LIKE ?", "%查询%")
	data := model.Find()
	// 返回
	c.JSON(200, gin.H{"code": 0, "msg": "Web", "data": data})
}
```

### 多条
```go
demo.Find()
```

### 单条
```go
demo.FindFirst()
```

### 返回类型
```go
demo.ResType()
```

### 生成SQL
```go
sql,args := db.SelectSQL()
```