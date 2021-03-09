### 事务
```php
use Model\Model;
use Model\Demo;

$model = Model::Conn();
try {
  // 开始
  $model->begin();
  $demo = new Demo();
  // SQL1
  $demo->Values(['uid'=>null,'title'=>'PHP-事件']);
  list($sql, $args) = $demo->InsertSql();
  $model->execute($sql, $args);
  $id = $model->lastInsertId();
  self::Print($sql, $args, $id);
  // SQL2
  $demo->Where('uid=?', $id);
  list($sql, $args) = $demo->DeleteSql();
  $model->execute($sql, $args);
  $num = $model->affectedRows();
  self::Print($sql, $args, $num);
  // 提交
  $model->commit();
} catch (\Exception $e) {
  $model->rollback();
}
```