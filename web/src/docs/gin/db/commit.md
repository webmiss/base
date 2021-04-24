### 事务
```go
import "webmis/model"

// 对象
demo := (&model.Demo{}).New()
conn, _ := demo.DBConn()
// 开始
tx, _ := conn.Begin()
// SQL1
demo.Values(map[string]interface{}{"uid": nil, "title": "Go-事件"})
sql, args := demo.InsertSql()
_, err1 := tx.Exec(sql, args...)
// SQL2
demo.Where("uid=?", id)
sql, args = demo.DeleteSql()
_, err2 := tx.Exec(sql, args...)
if err1 != nil || err2 != nil {
  tx.Rollback()
} else {
  // 提交
  tx.Commit()
}
```