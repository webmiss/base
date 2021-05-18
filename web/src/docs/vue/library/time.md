## 引入
```javascript
import TimeDate from '@/library/time/date'
import TimeFormat from '@/library/time/format'
import TimeSize from '@/library/time/size'
import TimeDay from '@/library/time/day'
import TimeWeek from '@/library/time/week'
```

## 年月日时分秒
```typescript
TimeDate();
```

## 时间格式化
```typescript
TimeFormat(
  date: string,   //2021-05-18 14:34:32
);
```

## 时间比较
```typescript
TimeSize(
  t1: number | string | Date,   //时间
  t2?: number | string | Date,  //现在
);
```

## 获取日期
```typescript
TimeDay(
  n: number=0,  //加减天数
  day?: any,    //指定日期
);
```

## 获取星期几
```typescript
TimeWeek(
  date: string | number | Date,   //2021-05-18 14:34:32
);
```
