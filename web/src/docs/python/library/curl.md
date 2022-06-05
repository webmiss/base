## 引入
```python
from library.curl import Curl
```

## 发送请求
```python
Curl.Request(
  url: str,               #请求地址
  data: str='',           #请求数据
  method: str='GET',      #请求方式
  header: dict={},        #Headers参数
  resType: str='json'     #返回类型
)
```

## URL参数
```python
# 生成
param = Curl.UrlEncode(
  {'id':1, 'name': '测试'}
)
print(param)
# 解析
data = Curl.UrlDecode(param)
print(data)
```
- id=1&name=%E6%B5%8B%E8%AF%95
- {"id":"1","name":"测试"}