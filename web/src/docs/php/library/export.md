## 引入
```php
use Library\Export;
```

## 导出Excel
```php
// 内容
$html = Export::Excel(
  array $data=[],                   //数据
  array $param=[
    'borderColor'=>'#E2E4E8',       //边框颜色
    'titleColor'=> '#666',          //标题颜色
    'titleBgColor'=> '#F2F2F2',     //标题背景
  ]
);
```

## 案例
```php
// 内容
$data = [['ID','名称'],[1, '测试']];
$html = Export::Excel($data);
// 保存到文件
FileEo::Writer('upload/'.date('YmdHis').'.xlsx', $html);
```
