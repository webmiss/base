### 连表
```go
import "webmis/model"

demo := (&model.Demo{}).Init()
demo.Table("test1 as a")
demo.LeftJoin("test2 as b", "a.id=b.uid")
demo.Columns("a.title", "b.name")
sql, args := demo.SelectSql()
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