### 插入
```python
from model.demo import Demo
# 对象
demo = Demo()
demo.Values({'uid': None, 'title':'添加'})
demo.Insert()
```

### 生成SQL
```python
sql, args = demo.InsertSQL()
```