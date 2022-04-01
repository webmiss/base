## 引入
```javascript
import PriceFormat from '@/library/price/format'
import PriceToFixed from '@/library/price/to-fixed'
```

## 金额-格式化
```typescript
PriceFormat.encode(
  price: string,    // 例如: 3600.01
  fixed: number=2   // 默认保留小数点后2位
);
PriceFormat.decode(
  price: string,    // 例如: 3,600.01
  fixed: number=2   // 默认保留小数点后2位
);
```

## 不四舍五入
```typescript
PriceToFixed(price: number, num: number);
```
