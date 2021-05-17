## 引入
```python
from service.base import Base
```

## 返回JSON
```python
Base().GetJSON(data='')
```

## Get参数
```python
Base().Get(name: str)
```

## Post参数
```python
Base().Post(name: str)
```

## 输出到控制台
```python
Base().Print(*content)
```

## 异常错误
```python
Base().Error(msg: str ='')
```
