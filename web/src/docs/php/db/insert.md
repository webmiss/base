### 插入单条
```php
use Model\Demo;
// 对象
$demo = new Demo();
$demo->Values(['uid'=>null,'title'=>'PHP-添加']);
$demo->Insert();
```

### 插入多条
```php
use Model\Demo;
// 对象
$demo = new Demo();
$demo->Values([
  ['uid'=>null,'title'=>'PHP-添加'],
]);
$demo->Insert();
```

### 生成SQL
```php
// 获取参数
list($sql, $args) = $demo->InsertSQL();
// 执行
$conn = $demo->DBConn();
$demo->Exec($conn, $sql, $args);
```