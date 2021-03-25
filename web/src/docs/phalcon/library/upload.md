## 引入
```php
use Library\Upload;
```

## 文件上传-Base64
```php
Safety::Base64([
  'path'=>'upload/',  //上传目录
  'base64'=>'',  //文件内容
  'filename'=>'', //文件名
  'ext'=>'png', //后缀
]);
```