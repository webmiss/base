### 执行SQL
```php
static function Index() {
	// 查询
	$demo = new Demo();
	$demo->Columns('uid','title');
	$demo->Where('title LIKE ?','%事务%');
	list($sql, $args) = $demo->SelectSql();
	// 执行
	$query = $demo->Query($sql, $args);
	// 数据
	$data = $query->fetchAll();
	// 返回
	return self::getJSON(['code'=>0, 'msg'=>'Web', 'data'=>$data]);
}
```

### 多条
```php
$demo->Find();
```

### 单条
```php
$demo->FindFirst();
```

### 生成SQL
```php
list($sql, $args) = $demo->SelectSql();
```