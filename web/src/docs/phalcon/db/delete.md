### 删除
```php
use Model\Demo;
// 对象
$demo = new Demo();
$demo->Where('uid=?', $id);
$num = $demo->Delete();
self::Print($num);
// 关闭
$demo->Close();
```

### 生成SQL
```php
list($sql, $args) = $demo->DeleteSql();
```