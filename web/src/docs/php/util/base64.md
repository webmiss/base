## 引入
```php
use Util\Base64;
```

## 编码
```php
Base64::Encode(string $data);
```

## 解码
```php
Base64::Decode(string $data);
```

## 编码(URL)
```php
Base64::UrlEncode(string $data);
```

## 解码(URL)
```php
Base64::UrlDecode(string $data);
```

## 压缩
```php
Base64::Compress(string $data);
```

## 解压
```php
Base64::UnCompress(string $data);
```

## 获取后缀
```php
Base64::GetExt(
  string $base64Type  //data:image/jpeg;base64、data:image/png;base64、data:image/gif;base64
);
```
