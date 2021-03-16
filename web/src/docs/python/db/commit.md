### 事务
```python
from model.model import Model
from model.demo import Demo

model = Model().Conn()
try:
  # 开始
  model.begin()
  cs = model.cursor()
  demo = Demo()
  # SQL1
  demo.Values({'uid':None,'title':'Python-事件'})
  sql, args = demo.InsertSql()
  cs.execute(sql, args)
  id = cs.lastrowid
  self.Print(sql, args, id)
  # SQL2
  demo.Where('uid=%s', id)
  sql, args = demo.DeleteSql()
  num = cs.execute(sql, args)
  self.Print(sql, args, num)
  # 提交
  model.commit()
except Exception as e:
  model.rollback()
```