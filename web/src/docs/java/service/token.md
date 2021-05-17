## 引入
```java
import webmis.service.AdminToken;
```

## 验证
```java
AdminToken.verify(String token, String urlPerm);
```

## 权限数组
```java
AdminToken.Perm(String token);
```

## 生成
```java
AdminToken.Create(HashMap<String, Object> data);
```

## 获取
```java
AdminToken.Token(String token);
```
