### 插入
```php
use Model\Demo;
// 对象
$demo = new Demo();
$demo->Values(['uid'=>null,'title'=>'PHP-添加']);
$id = $demo->Insert();
self::Print($id);
// 关闭
$demo->Close();
```

### 生成SQL
```php
list($sql, $args) = $demo->InsertSql();
```