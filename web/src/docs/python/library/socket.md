## 服务器
```bash
# 运行
./bash socket
# 启动
./bash socketStart
```

## 群发
```python
from library.socket import Socket

Socket.Send('admin', {
  'code': 0,
  'type': 'msg',
  'data': {
    'title': '测试',
    'content': '测试内容',
  },
})
```
