### 执行SQL
```python
  # 首页
  def index(self):
    # 查询
    demo = Demo()
    demo.Columns('uid','title')
    demo.Where('title LIKE %s','%事务%')
    sql, args = demo.SelectSql()
    # 执行
    cs, num = demo.Query(sql, args)
    # 数据
    data = cs.fetchall()
    # 返回
    return self.getJSON({'code':0,'msg':'Web', 'data':data})
```

### 多条
```python
demo.Find()
```

### 单条
```python
demo.FindFirst()
```

### 获取SQL
```python
demo.SelectSql()
```