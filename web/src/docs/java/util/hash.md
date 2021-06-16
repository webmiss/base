## 引入
```java
import webmis.util.Hash;
```

## Md5
```java
Hash.Md5(String data);
```

## Sha256
```java
Hash.Sha256(String data);
```

## HmacSha1
```java
Hash.HmacSha1(String data, byte[] key);
```

## HmacSha256
```java
Hash.HmacSha256(String data, byte[] key);
```

## Byte转为String
```java
Hash.Base64Encode(byte[] data);
```

## Byte转为16进制
```java
Hash.HexEncode(byte[] bytes);
```
