## 引入
```python
from library.export import Export
```

## 导出Excel
```python
Excel(
  data: list=[],                  #数据
  param: dict={
    'borderColor':'#E2E4E8',      #边框颜色
    'titleColor': '#666',         #标题颜色
    'titleBgColor': '#F2F2F2',    #标题背景
  }
)
```

## 案例
```python
data = [['ID','名称'],[1, '测试']]
html = Export.Excel(data)
FileEo.Root = Env.root_dir
FileEo.Writer('upload/'+Util.Date('%Y%m%d%H%M%S')+'.xlsx', html, 'w')
```
