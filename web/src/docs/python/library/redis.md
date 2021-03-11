## Redis 使用
```python
from library.redis import Redis
# 对象
redis = Redis()
# 关闭
redis.Close()
```
**Conn-连接**
```python
redis.Conn()
```
**Set-添加**
```python
redis.Set(key: str, val: str)
```
**Get-获取**
```python
redis.Get(key: str)
```
**Get-删除**
```python
redis.Get(*key: str)
```

**Exist-是否存在**
```python
redis.Exist(key: str)
```
**设置过期时间(秒)**
```python
redis.Expire(key: str, ttl: int)
```
**获取过期时间(秒)**
```python
redis.Ttl(key: str)
```
**获取长度**
```python
redis.StrLen(key: str)
```

## 哈希(Hash)
**HSet-添加**
```python
redis.HSet(name: str, key, val)
redis.HMSet(name: str, obj)
```
**HGet-获取**
```python
redis.HGet(name: str, key)
redis.HMGet(name: str, key)
```
**Hdel-删除**
```python
redis.HDel(name: str, *key)
```
**HExist-是否存在**
```python
redis.HExist(name: str, key)
```
**HLen-Key个数**
```python
redis.HLen(name: str)
```