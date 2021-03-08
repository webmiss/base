### 删除
```python
from model.demo import Demo

demo = Demo()
demo.Where('uid=%s', id)
num = demo.Delete()
self.Print(num)
```

### 生成SQL
```python
sql, args = db.DeleteSql()
```