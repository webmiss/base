## 引入
```javascript
import Get from '@/library/request/get'
import Post from '@/library/request/post'
import Put from '@/library/request/put'
import Delete from '@/library/request/delete'
import Patch from '@/library/request/patch'
```

## 请求方式
```typescript
Request(
  url: string,    //请求地址
  data?: any,     //请求参数
  success?: any,  //成功回调
  fail?: any,     //失败回调
  config?: any,   //配置
);
```
