## Redis 使用
```php
use Library\Redis;
// 对象
$redis = new Redis();
// 关闭
$redis->Close();
```
**Conn-连接**
```php
$redis->Conn();
```
**Set-添加**
```php
$redis->Set(string $key, string $val);
```
**Get-获取**
```php
$redis->Get(string $key);
```
**Get-删除**
```php
$redis->Del(string ...$key);
```
**Exist-是否存在**
```php
$redis->Exist(string $key);
```
**设置过期时间(秒)**
```php
$redis->Expire(string $key, int $ttl);
```
**获取过期时间(秒)**
```php
$redis->Ttl(string $key);
```
**获取长度**
```php
$redis->StrLen(string $key);
```

## 哈希(Hash)
**HSet-添加**
```php
$redis->HSet(string $name, string $key, $val);
$redis->HMSet(string $name, array $obj);
```
**HGet-获取**
```php
$redis->HGet(string $name, string $key);
$redis->HMGet(string $name, string $key);
```
**Hdel-删除**
```php
$redis->HDel(string $name, string $key);
```
**HExist-是否存在**
```php
$redis->HExist(string $name, string $key);
```
**HLen-Key个数**
```php
$redis->HLen(string $name);
```