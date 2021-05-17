## 引入
```php
use Service\AdminToken;
```

## 验证
```php
AdminToken::Verify(string $token, string $urlPerm);
```

## 权限数组
```php
AdminToken::Perm(string $token);
```

## 生成
```php
AdminToken::Create(array $data);
```

## 获取
```php
AdminToken::Token(string $token);
```
