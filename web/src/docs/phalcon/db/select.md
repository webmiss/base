### 查询SQL
```php
$demo = new Demo();
$demo->Columns('uid','title');
$demo->Where('title LIKE ?','%事务%');
// SQL
list($sql, $args) = $demo->SelectSql();
// 查询
$query = $demo->Query($sql, $args);
// 结果
$res = $query->fetchAll();
self::print($res);
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