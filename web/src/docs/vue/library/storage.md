## 引入
```javascript
import Storage from '@/library/storage'
```

## 本地硬盘
```typescript
// 保存
Storage.setItem(key: string, data: string);
// 获取
Storage.getItem(key: string);
// 删除
Storage.removeItem(key: string);
// 清除
Storage.clear();
```
