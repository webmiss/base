### 创建模型
**app/model/demo.go**
```php
<?php
namespace model;

use Model\Model;

class Demo extends Model {

  /* 构造函数 */
  function __construct(){
    self::Table('test');
  }

}
```

### 使用
```php
use Model\Demo;
$demo = new Demo();
```
