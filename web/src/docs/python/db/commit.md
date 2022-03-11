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
  sql, args = demo.InsertSQL()
  cs.execute(sql, args)
  id = model.LastInsertId(cs)
  # SQL2
  m2 = Demo()
  m2.Where('uid=%s', id)
  sql, args = m2.DeleteSQL()
  cs.execute(sql, args)
  # 提交
  cs.close()
  conn.commit()
except Exception as e:
  conn.rollback()
finally :
  conn.close()

```