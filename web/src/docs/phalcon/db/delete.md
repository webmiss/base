### 删除
```php
use Model\Demo;

$demo = new Demo();
$demo->Where('uid=?', $id);
$num = $demo->Delete();
self::Print($num);
```

### 生成SQL
```php
list($sql, $args) = $demo->DeleteSql();
```