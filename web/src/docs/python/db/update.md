### 更新
```python
from model.demo import Demo

demo = Demo()
demo.Set({'title':'Python-更新'})
demo.Where('uid=%s', id)
num = demo.Update()
self.Print(num)
```

### 生成SQL
```python
sql, args = db.UpdateSql()
```