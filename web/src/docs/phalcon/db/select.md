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

### 多条
```php
$model->Find();
```

### 单条
```php
$model->FindFirst();
```

### 返回类型
```php
$model->ResType();
```

### 生成SQL
```php
list($sql, $args) = $model->SelectSQL();
```