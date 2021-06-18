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

## OSS-签名直传
```php
Upload::OssPolicy(
  string $ext,        //扩展名
  int $expireTime=0   //有效时间(秒)
);
```
- ext: "jpg", "png", "gif"
- expireTime: 0 默认30秒

## OSS-签名验证
```php
Upload::OssPolicyVerify(
  array $param,   //回调参数
);
```

## 图片回收
```php
Upload::HtmlImgClear(string $html, string $dir);
```

## 文件名-生成
```php
Upload::GetFileName();
```

## 图片地址-获取HTML
```php
Upload::GetHtmlFile(string $html);
```
