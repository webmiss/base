### 事务
```php
use Model\Demo;

$model = new Demo();
$conn = $model->DBConn();
try {
  // 开始
  $conn->begin();
  // SQL1
  $m1 = new Demo();
  $m1->Values(['uid'=>null,'title'=>'PHP-事件']);
  list($sql, $args) = $m1->InsertSql();
  $conn->execute($sql, $args);
  // SQL2
  $m2 = new Demo();
  $m2->Where('uid=?', $id);
  list($sql, $args) = $m2->DeleteSql();
  $conn->execute($sql, $args);
  // 提交
  $conn->commit();
} catch (\Exception $e) {
  $conn->rollback();
}
```