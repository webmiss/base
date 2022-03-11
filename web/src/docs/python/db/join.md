### 连表
```python
from model.demo import Demo
# 对象
demo = Demo()
demo.Table('test1 as a')
demo.LeftJoin('test2 as b', 'a.id=b.uid')
demo.Columns('a.title', 'b.name')
sql, args = demo.SelectSQL()
self.Print(sql, args)
```

### 其他
```python
# INNER JOIN 
demo.Join()
# LEFT JOIN
demo.LeftJoin()
# RIGHT JOIN
demo.RightJoin()
# FULL JOIN
demo.FullJoin()
```