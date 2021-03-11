### 事务
```go
import "webmis/model"
// 对象
demo := (&model.Demo{}).New()
conn, _ := demo.Conn()
// 开始
tx, _ := conn.Begin()
// SQL1
demo.Values(map[string]interface{}{
  "uid":   nil,
  "title": "Go-事件",
})
sql, args := demo.InsertSql()
rows, err := tx.Exec(sql, args...)
if err != nil {
  tx.Rollback()
}
id, _ := rows.LastInsertId()
self.Print(sql, args, id)
// SQL2
demo.Where("uid=?", id)
sql, args = demo.DeleteSql()
rows, err = tx.Exec(sql, args...)
if err != nil {
  tx.Rollback()
}
num, _ := rows.RowsAffected()
self.Print(sql, args, num)
// 提交
tx.Commit()
// 关闭
demo.Close()
```