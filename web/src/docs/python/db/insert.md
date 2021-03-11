### 插入
```python
from model.demo import Demo
# 对象
demo = Demo()
demo.Values({'uid': None, 'title':'添加'})
id = demo.Insert()
self.Print(id)
# 关闭
demo.Close()
```

### 生成SQL
```python
sql, args = demo.InsertSql()
```