## 引入
```java
import webmis.library.Qrcode;
```

## 生成
```java
HashMap<String, Object> param = new HashMap<String, Object>();
param.put("text", "");                      //内容
param.put("size", 200);                     //大小
param.put("tmpPath", "upload/tmp/");        //缓存目录
param.put("filename", _getName()+".png");   //文件名
Qrcode.Create(param)
```

## 识别
```java
Qrcode.Scan("public/upload/qrcode/demo.png");
```
