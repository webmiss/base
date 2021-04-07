## 引入
```python
from library.qrcode import Qrcode
```

## 生成
```python
Qrcode.Create(
  'text': '',     #内容
  'size': 5,      #大小
  'border': 2,    #边距
)
```

## 识别
```python
Qrcode.Scan('public/upload/qrcode/demo.png')
```
