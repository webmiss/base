### 删除
```python
from model.demo import Demo
# 对象
demo = Demo()
demo.Where('uid=%s', id)
num = demo.Delete()
self.Print(num)
```

### 生成SQL
```python
sql, args = db.DeleteSql()
```