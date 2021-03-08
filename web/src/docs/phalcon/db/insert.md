### 插入
```php
use Model\Demo;

$demo = new Demo();
$demo->Values(['uid'=>null,'title'=>'添加']);
$id = $demo->Insert();
self::Print($id);
```

### 获取SQL
```php
list($sql, $args) = $demo->InsertSql()
```