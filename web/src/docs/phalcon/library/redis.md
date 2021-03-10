## Redis 使用
```php
use Library\Redis;
```
**Conn-连接**
```php
Redis::Conn();
```
**Set-添加**
```php
Redis::Set(string $key, string $val);
```
**Get-获取**
```php
Redis::Get(string $key);
```
**Exist-是否存在**
```php
Redis::Exist(string $key);
```
**设置过期时间(秒)**
```php
Redis::Expire(string $key, int $ttl);
```
**获取过期时间(秒)**
```php
Redis::Ttl(string $key);
```
**获取长度**
```php
Redis::StrLen(string $key);
```

## 哈希(Hash)
**HSet-添加**
```php
Redis::HSet(string $name, string $key, $val)
Redis::HMSet(string $name, array $obj)
```
**HGet-获取**
```php
Redis::HGet(string $name, string $key)
Redis::HMGet(string $name, string $key)
```
**Hdel-删除**
```php
Redis::HDel(string $name, string $key)
```
**HExist-是否存在**
```php
Redis::HExist(string $name, string $key)
```
**HLen-Key个数**
```php
Redis::HLen(string $name)
```