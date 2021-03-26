## 引入
```java
import webmis.library.Safety;
```

## 正则-公共
```java
Safety.isRight(
  String name,  //uname,passwd,tel,email,idcard
  String val    //内容
);
```

## 正则-验证
```java
Safety.test(
  String reg,  //正则 "^1\d{10}$"
  String val   //内容
);
```

## Base64-加密
```java
Safety.encode(
  HashMap<String,Object> data  //数据
);
```

## Base64-解密
```java
Safety.decode(
  String token  //Token
);
```
