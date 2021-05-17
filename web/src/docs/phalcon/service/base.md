## 引入
```php
use Service\Base;
```

## 返回JSON
```php
Base::GetJSON(array $data=[]);
```

## Get参数
```php
Base::Get(string $name);
```

## Post参数
```php
Base::Post(string $name);
```

## 输出到控制台
```php
Base::Print(...$content);
```

## 异常错误
```php
Base::Error($msg);
```
