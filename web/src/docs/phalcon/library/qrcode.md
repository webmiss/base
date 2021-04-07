## 引入
```php
use Library\Qrcode;
```

## 生成
```php
Qrcode::create([
  'text'=> '',  //内容
  'type'=>'qr',  //类型: upc-a、code-39、qr、dmtx等
  'tmpPath'=>'upload/tmp/', //缓存目录
  'filename'=>self::_getName().'.png', //文件名
  'options'=>['f'=>'png','p'=>-20,'w'=>200,'h'=>200], //配置
]);
```

## 识别
```php
Qrcode::scan($file);
```