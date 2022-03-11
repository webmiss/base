### 删除
```php
use Model\Demo;
// 对象
$demo = new Demo();
$demo->Where('uid=?', $id);
$demo->Delete();
```

### 生成SQL
```php
list($sql, $args) = $demo->DeleteSQL();
```