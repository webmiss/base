## 引入
```python
from library.upload import Upload
```

## 单文件
```python
Upload.File(
  'upName': 'up',     #上传名称
  'path':'upload/',   #上传目录
  'filename':'',      #文件名
  'bind':['jpg','jpeg','png','gif','mov','mp4','wav','mp3'], #允许格式
)
```

## Base64
```python
Upload.File(
  'path':'upload/',   #上传目录
  'base64':'',        #文件内容
  'filename':'',      #文件名
  'ext':'png',        #后缀
)
```

## 图片回收
```python
Upload.HtmlImgClear(html: str, dir: str)
```

## 文件名-生成
```python
Upload.GetFileName()
```

## 图片地址-获取HTML
```python
Upload.GetHtmlFile(html: str)
```
