### 更新
```php
use Model\Demo;
// 对象
$demo = new Demo();
$demo->Set(['title'=>'PHP-更新']);
$demo->Where('uid=?', $id);
$num = $demo->Update();
self::Print($num);
// 关闭
$demo->Close();
```

### 生成SQL
```php
list($sql, $args) = $demo->UpdateSql();
```