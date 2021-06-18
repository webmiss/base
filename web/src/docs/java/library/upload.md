## 引入
```java
import webmis.library.Upload;
```

## 单文件
```java
// 参数
HashMap<String, Object> params = new HashMap<String, Object>();
params.put("path", "upload/");  //上传目录
params.put("filename", "");     //文件名
ArrayList<String> bind = new ArrayList<String>();
bind.add("jpg");
bind.add("jpeg");
bind.add("png");
bind.add("gif");
bind.add("mov");
bind.add("mp4");
bind.add("wav");
bind.add("mp3");
params.put("bind", bind);   //允许格式

Upload.File(
  MultipartFile file,               //文件流
  HashMap<String, Object> params    //参数
);
```

## Base64
```java
// 参数
HashMap<String, Object> params = new HashMap<String, Object>();
params.put("path", "upload/"); //上传目录
params.put("base64", "");      //文件内容
params.put("filename", "");    //文件名
params.put("ext", "png");      //后缀

Upload.Base64(
  HashMap<String, Object> params  //参数
);
```

## OSS-签名直传
```java
Upload.OssPolicy(
  String ext,       //扩展名
  long expireTime   //有效时间(秒)
);
```
- ext: "jpg", "png", "gif"
- expireTime: 0 默认30秒

## OSS-签名验证
```java
Upload.OssPolicyVerify(
  JSONObject param,   //回调参数
);
```

## 图片回收
```java
Upload.HtmlImgClear(String html, String dir);
```

## 文件名-生成
```java
Upload.GetFileName();
```

## 图片地址-获取HTML
```java
Upload.GetHtmlFile(String html);
```
