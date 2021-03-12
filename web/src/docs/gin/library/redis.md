## Redis 使用
```go
import "webmis/library"
# 对象
redis := (&library.Redis{}).New()
# 关闭
redis.Close()
```
**Conn-连接**
```go
redis.Conn()
```
**Set-添加**
```go
redis.Set(key string, val interface{})
```
**Get-获取**
```go
redis.Get(key string)
```
**Get-删除**
```go
redis.Get(keys ...interface{})
```

**Exist-是否存在**
```go
redis.Exist(key string)
```
**设置过期时间(秒)**
```go
redis.Expire(key string, ttl int64)
```
**获取过期时间(秒)**
```go
redis.Ttl(key string)
```
**获取长度**
```go
redis.StrLen(key string)
```

## 哈希(Hash)
**HSet-添加**
```go
redis.HSet(name string, key string, val interface{})
redis.HMSet(name string, obj interface{})
```
**HGet-获取**
```go
redis.HGet(name string, key string)
redis.HMGet(name string, keys ...string)
```
**Hdel-删除**
```go
redis.HDel(name string, key ...string)
```
**HExist-是否存在**
```go
redis.HExist(name string, key string)
```
**HLen-Key个数**
```go
redis.HLen(name string)
```