### 连表
```go
import "webmis/model"
// 对象
demo := (&model.Demo{}).New()
demo.Table("test1 as a")
demo.LeftJoin("test2 as b", "a.id=b.uid")
demo.Columns("a.title", "b.name")
sql, args := demo.SelectSQL()
self.Print(sql, args)
```

### 其他
```go
// INNER JOIN 
db.Join()
// LEFT JOIN
db.LeftJoin()
// RIGHT JOIN
db.RightJoin()
// FULL JOIN
db.FullJoin()
```