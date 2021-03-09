### 更新
```php
use Model\Demo;

$demo = new Demo();
$demo->Set(['title'=>'PHP-更新']);
$demo->Where('uid=?', $id);
$num = $demo->Update();
self::Print($num);
```

### 生成SQL
```php
list($sql, $args) = $demo->UpdateSql();
```