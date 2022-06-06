## 引入
```javascript
import ImgCompress from '@/library/plus/img/compress'
import ImgReader from '@/library/plus/img/reader'
```

## 图片压缩(文件方式)
```typescript
ImgCompress(
  file: any,      //文件
  parm: any = {
    width: 0,     //宽
    height: 0,    //高
    cut: true,    //裁切
    ext: 'jpg',   //后缀
    quality: 0.8, //png质量
  },
  callback: any,  //成功回调
);
```

## 图片压缩(文件对象)
```typescript
ImgReader(
  fileObj: any,   //对象
  parm: any = {
    width: 0,     //宽
    height: 0,    //高
    cut: true,    //裁切
    ext: 'jpg',   //后缀
    quality: 0.8, //png质量
  },
  callback: any,  //成功回调
);
```
