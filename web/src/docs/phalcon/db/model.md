### 创建模型
**model/Demo.php**
```php
<?php
namespace Model;

class Demo extends Model {

  /* 构造函数 */
  function __construct(){
    $this->Table('test');
  }

}
```

### 使用
```php
use Model\Demo;
// 对象
$model = new Demo();
```

### 查询
```php
$model->Query($conn, string $sql, array $args=[]);
```

### 执行
```php
$model->Exec($conn, string $sql, array $args=[]);
```
