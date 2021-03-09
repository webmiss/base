### 插入
```php
use Model\Demo;

$demo = new Demo();
$demo->Values(['uid'=>null,'title'=>'PHP-添加']);
$id = $demo->Insert();
self::Print($id);
```

### 生成SQL
```php
list($sql, $args) = $demo->InsertSql();
```