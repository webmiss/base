## 引入
```python
from util.util import Util
```

## 格式化时间
```python
Util.Date(format: str = '%Y-%m-%d %H:%M:%S', timestamp: float = None)
```

## 时间戳
```python
Util.Time()
```

## 日期转时间戳
```python
Util.Strtotime(day: str=None, format: str='%Y-%m-%d %H:%M:%S')
```

## 去首尾空格
```python
Util.Trim(content, charlist: str = None)
```

## 拆分字符串为数组
```python
Util.Explode(delimiter: str, string: str)
```

## 数组合成字符串
```python
Util.Implode(glue: str, pieces: list)
```

## JSON转字符串
```python
Util.JsonEncode(arr)
```

## JSON字符串转数组
```python
Util.JsonDecode(str: str)
```

## 合并数组
```python
Util.ArrayMerge(*arrays: dict)
```

## URL参数
```python
Util.UrlToArray(url: str)
```
