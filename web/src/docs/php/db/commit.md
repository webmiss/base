## 事务-PHP
```php
use Model\Demo;

$model = new Demo();
$conn = $model->DBConn();
try {
  // 开始
  $conn->beginTransaction();
  // SQL1
  $m1 = new Demo();
  $m1->Values(['uid'=>null,'title'=>'PHP-事件']);
  list($sql, $args) = $m1->InsertSQL();
  $model->Exec($conn, $sql, $args);
  $id = $model->GetID();
  // SQL2
  $m2 = new Demo();
  $m2->Where('uid=?', $id);
  list($sql, $args) = $m2->DeleteSQL();
  $model->Exec($conn, $sql, $args);
  // 提交
  $conn->commit();
} catch (\Exception $e) {
  $conn->rollBack();
}
```

## 事务-Phalcon
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
  list($sql, $args) = $m1->InsertSQL();
  $conn->execute($sql, $args);
  $id = $model->LastInsertId($conn);
  // SQL2
  $m2 = new Demo();
  $m2->Where('uid=?', $id);
  list($sql, $args) = $m2->DeleteSQL();
  $conn->execute($sql, $args);
  // 提交
  $conn->commit();
} catch (\Exception $e) {
  $conn->rollback();
}
```