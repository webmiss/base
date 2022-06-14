## 引入
```python
from util.util import Util
```

## 执行Linux命令
```python
Util.Exec(cmd: str)
```

## 格式化时间
```python
Util.Date(format: str = '%Y-%m-%d %H:%M:%S', timestamp: float = None)
Util.DateFormat(
  format: str = '%Y-%m-%d %H:%M:%S',  #格式
  duration: str = '-1d',              #年(y)、月(m)、周(w)、日(d)、时(h)、分(i)、秒(s)
)
```

## 时间戳
```python
Util.Time()
```

## 日期转时间戳
```python
Util.Strtotime(day: str=None, format: str='%Y-%m-%d %H:%M:%S')
```

## Gmt时间格式
```python
Util.GmtISO8601(timestamp: int)
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

## Json转换
```python
# 编码
Util.JsonEncode(data)
# 解码
Util.JsonDecode(data: str)
```

## 合并数组
```python
Util.ArrayMerge(*arrays: dict)
```

## URL参数
```python
Util.UrlToArray(url: str)
```
