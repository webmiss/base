## 引入
```php
use Library\Upload;
```

## 单文件
```php
Upload::File([
  'upName'=>'up',  //上传名称
  'path'=>'upload/',  //上传目录
  'filename'=>'', //文件名
  'bind'=>['jpg','jpeg','png','gif','mov','mp4','wav','mp3'], //允许格式
]);
```

## Base64
```php
Upload::Base64([
  'path'=>'upload/',  //上传目录
  'base64'=>'',  //文件内容
  'filename'=>'', //文件名
  'ext'=>'png', //后缀
]);
```

## 图片回收
```php
Upload::HtmlImgClear(string $html, string $dir);
```