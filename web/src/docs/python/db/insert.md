### 插入
```python
from model.demo import Demo

demo = Demo()
demo.Values({'uid': None, 'title':'添加'})
demo.Insert()
```

### 获取SQL
```python
demo = Demo()
sql, args = demo.InsertSql()
```