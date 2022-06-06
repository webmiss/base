## 引入
```javascript
import DownBlob from '@/library/down/blob'
import DownFile from '@/library/down/file'
import DownExport from '@/library/down/export'
```

## Blob下载
```typescript
DownBlob(
  data: any='',                 //数据
  filename: string='down.txt'   //文件名
);
```

## 文件下载
```typescript
DownFile(
  url: string,                  //文件地址
  filename: string='down.txt'   //文件名
);
```

## 导出Excel
```typescript
DownExport(
  data: any=[],               //数据: [['ID','名称'],[1,测试]]
  param: any={
    filename: 'export.xlsx',  //文件名
    borderColor: '#E2E4E8',   //边框颜色
    titleColor: '#666',       //标题颜色
    titleBgColor: '#F2F2F2',  //标题背景
  },
);
```
