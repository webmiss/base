## 引入
```javascript
import RegRight from '@/library/reg/right'
import RegTest from '@/library/reg/test'
```

## 公共
```typescript
RegRight(
  name: string,           //项目: uname、tel、email、vcode、passwd
  val: string,            //内容
  isMsg: boolean=false,   //错误提示
);
```

## 验证
```typescript
RegTest(
  reg: RegExp,     //正则
  val: string,     //内容
);
```
