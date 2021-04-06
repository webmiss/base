## 服务器
```bash
# 运行
./bash start
```

## 群发
```java
import webmis.library.Socket;

HashMap<String,Object> data = new HashMap<String,Object>();
data.put("code", 0);
data.put("type", "msg");
HashMap<String,Object> msg = new HashMap<String,Object>();
msg.put("title", "测试");
msg.put("content", "测试内容");
data.put("data", msg);
Socket.Send("admin", data);
```
