### 查询
```php
static function Index() {
  // 查询
  $model = new Demo();
  $model->Columns('uid','title');
  $model->Where('title LIKE ?','%查询%');
  $data = $model->Find();
  // 返回
  return self::getJSON(['code'=>0, 'msg'=>'Web', 'data'=>$data]);
}
```

### 查询结果
```php
// 多条
$model->Find();
// 单条
$model->FindFirst();
```

### 返回类型
```php
// string、int、float
$model->ResType(['id'=>'string']);
```

### 生成SQL
```php
list($sql, $args) = $model->SelectSQL();
```