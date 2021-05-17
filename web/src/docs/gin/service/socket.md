## 路由
```go
router(uid string, conn *websocket.Conn, message []byte)
```

## 群发
```go
sendAll(data map[string]interface{})
```

## 单发
```go
send(conn *websocket.Conn, data map[string]interface{})
```
