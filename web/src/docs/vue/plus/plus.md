## 引入
```javascript
import PlusReady from '@/library/plus/ready'
import PlusBack from '@/library/plus/back'
import VersionDiff from '@/library/inc/version-diff'
```

## 监听加载
```typescript
PlusReady(
  callback: any,  //回调函数
);
```

## Android返回键
```typescript
PlusBack(
  callback: any,  //回调函数
);
```

## 版本比较
```javascript
VersionDiff(
  v1: string, //版本: 1.0.0
  v2: string, //版本: 2.0.0
);
```
