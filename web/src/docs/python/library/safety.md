## 引入
```python
from library.safety import Safety
```

## 正则-公共
```python
Safety.isRight(
  name: str,  #uname,passwd,tel,email,idcard
  val: any    #内容
)
```

## 正则-验证
```python
Safety.test(
  reg=r'^1\d{10}$',  #正则
  val: any           #内容
)
```

## Base64-加密
```python
Safety.encode(
  param: dict={}   #数据
)
```

## Base64-解密
```python
Safety.decode(
  token: str=''   #Token
)
```
