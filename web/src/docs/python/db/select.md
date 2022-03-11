### 查询
```python
  # 首页
  def index(self):
    # 查询
    model = Demo()
    model.Columns('uid','title')
    model.Where('title LIKE %s','%查询%')
    data = model.Find()
    # 返回
    return self.getJSON({'code':0,'msg':'Web', 'data':data})
```

### 多条
```python
model.Find()
```

### 单条
```python
model.FindFirst()
```

### 返回类型
```python
model.ResType()
```

### 生成SQL
```python
sql, args = model.SelectSQL()
```