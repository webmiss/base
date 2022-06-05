## 引入
```java
import webmis.library.Curl;
```

## 发送请求
```java
Curl.Request(
  String url,                       //请求地址
  String data,                      //请求数据
  String method,                    //请求方式
  HashMap<String, Object> header    //Headers参数
);
```

## URL参数
```java
// 生成
HashMap<String, Object> obj = new HashMap<String, Object>();
obj.put("id", 1);
obj.put("name", "测试");
String param = Curl.UrlEncode(obj);
Print(param);
// 解析
HashMap<String, String> data = Curl.UrlDecode(param);
Print(data);
```
- name=%E6%B5%8B%E8%AF%95&id=1 
- {name=测试, id=1}