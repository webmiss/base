### 事务
```python
from model.demo import Demo

model = Demo()
conn = model.DBConn()
try:
  # 开始
  conn.begin()
  cs = conn.cursor()
  # SQL1
  m1 = Demo()
  m1.Values({'uid':None,'title':'Python-事件'})
  sql, args = demo.InsertSql()
  cs.execute(sql, args)
  # SQL2
  m2 = Demo()
  m2.Where('uid=%s', id)
  sql, args = m2.DeleteSql()
  cs.execute(sql, args)
  # 提交
  model.commit()
except Exception as e:
  model.rollback()
```