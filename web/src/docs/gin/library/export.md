## 引入
```go
import "webmis/library"
```

## 导出Excel
```go
Excel(
  data [][]interface{},           //数据
  params map[string]interface{}{
    "borderColor":"#E2E4E8",      //边框颜色
    "titleColor": "#666",         //标题颜色
    "titleBgColor": "#F2F2F2",    //标题背景
  }
) string {}
```

## 案例
```go
data := [][]interface{}{}
data = append(data, []interface{}{"ID", "名称"})
data = append(data, []interface{}{1, "测试"})
html := (&library.Export{}).Excel(data, nil)
(&library.FileEo{}).New(config.Env().RootDir)
(&library.FileEo{}).Writer("upload/"+util.Date("20060102150405")+".xlsx", html)
```
