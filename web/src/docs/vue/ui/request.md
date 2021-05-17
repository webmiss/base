## 引入
```javascript
import Get from '@/library/ui/request-get'
import Post from '@/library/ui/request-post'
import Put from '@/library/ui/request-put'
import Delete from '@/library/ui/request-delete'
import Request from '@/library/ui/request-request'
```

## 请求方式
```javascript
Request(
  url: string,    //请求地址
  data?: any,     //请求参数
  success?: any,  //成功回调
  fail?: any,     //失败回调
  config?: any,   //配置
);
```
