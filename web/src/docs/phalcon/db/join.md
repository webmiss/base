### 连表
```php
use Model\Demo;
// 对象
$demo = new Demo();
$demo->Table('test1 as a');
$demo->LeftJoin('test2 as b', 'a.id=b.uid');
$demo->Columns('a.title', 'b.name');
list($sql, $args) = $demo->SelectSql();
self::Print($sql, $args);
// 关闭
$demo->Close();
```

### 其他
```php
// INNER JOIN 
$demo->Join();
// LEFT JOIN
$demo->LeftJoin();
// RIGHT JOIN
$demo->RightJoin();
// FULL JOIN
$demo->FullJoin();
```