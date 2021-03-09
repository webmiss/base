### 创建模型
**model/Demo.php**
```php
<?php
namespace Model;

class Demo extends Model {

  /* 构造函数 */
  function __construct(){
    self::Db('');
    self::Table('test');
  }

}
```

### 使用
```php
use Model\Demo;
$demo = new Demo();
```
