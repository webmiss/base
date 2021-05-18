## 引入
```javascript
import DownBlob from '@/library/down/blob'
import DownFile from '@/library/down/file'
```

## Blob
```typescript
DownBlob(
  url: string,  //数据地址
  param: any,   //Post参数
);
```

## 文件
```typescript
DownFile(
  url: string,    //文件地址
  name?: string,  //重命名
  ext?: string,   //文件后缀
);
```


