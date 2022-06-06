## 引入
```javascript
import Get from '@/library/request/get'
import Post from '@/library/request/post'
import Put from '@/library/request/put'
import Delete from '@/library/request/delete'
import Patch from '@/library/request/patch'
```

## Get请求
```typescript
Get(
  url: string,      //请求地址
  data: any={},     //请求参数
  success?: any,    //成功回调
  fail?: any,       //失败回调
  config?: any,     //配置
);
```

## Post请求
```typescript
Post(
  url: string,      //请求地址
  data: any={},     //请求参数
  success?: any,    //成功回调
  fail?: any,       //失败回调
  config?: any,     //配置
);
```

## Put请求
```typescript
Put(
  url: string,      //请求地址
  data: any={},     //请求参数
  success?: any,    //成功回调
  fail?: any,       //失败回调
  config?: any,     //配置
);
```

## Delete请求
```typescript
Delete(
  url: string,      //请求地址
  data: any={},     //请求参数
  success?: any,    //成功回调
  fail?: any,       //失败回调
  config?: any,     //配置
);
```

## Patch请求
```typescript
Patch(
  url: string,      //请求地址
  data: any={},     //请求参数
  success?: any,    //成功回调
  fail?: any,       //失败回调
  config?: any,     //配置
);
```
