## Redis 使用
```java
import webmis.library.Redis;
// 对象
Redis redis = new Redis();
// 关闭
redis.Close();
```
**Conn-连接**
```java
redis.Conn();
```
**Set-添加**
```java
redis.Set(String key, String val);
```
**Get-获取**
```java
redis.Get(String key);
```
**Get-删除**
```java
redis.Del(String... key);
```
**Exist-是否存在**
```java
redis.Exist(String key);
```
**设置过期时间(秒)**
```java
redis.Expire(String key, int ttl);
```
**获取过期时间(秒)**
```java
redis.Ttl(String key);
```
**获取长度**
```java
redis.StrLen(String key);
```

## 哈希(Hash)
**HSet-添加**
```java
redis.HSet(String name, String key, String val);
redis.HMSet(String name, Map<String, String> obj);
```
**HGet-获取**
```java
redis.HGet(String name, String key);
redis.HMGet(String name, String... key);
```
**Hdel-删除**
```java
redis.HDel(String name, String... key);
```
**HExist-是否存在**
```java
redis.HExist(String name, String key);
```
**HLen-Key个数**
```java
redis.HLen(String name);
```