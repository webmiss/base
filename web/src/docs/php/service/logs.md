## 引入
```php
use Service\Logs;
```

## 访问日志
```php
Logs::Log($data);
```

## 信息日志
```php
Logs::Info($data);
```

## 操作日志
```php
Logs::Action($data);
```

## 错误日志
```php
Logs::Error($data);
```

## 其它
```php
Logs::Writer(string $text);
```
