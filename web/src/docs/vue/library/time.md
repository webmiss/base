## 引入
```javascript
import TimeStamp from '@/library/time/timestamp'
import TimeDate from '@/library/time/date'
import TimeSize from '@/library/time/size'
import TimeDay from '@/library/time/day'
import TimeWeek from '@/library/time/week'
import TimeFormatHour from '@/library/time/format_hour'
import TimeFormatTime from '@/library/time/format_time'
```

## 时间戳(10位)
```typescript
TimeStamp();
```

## 年月日时分秒
```typescript
TimeDate();
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

## 格式化-小时
```typescript
TimeFormatHour.encode(
  second: number,   //秒
);
TimeFormatHour.decode(
  time: string,     //时间, 00:01:30
);
```

## 格式化-时间
```typescript
TimeFormatTime(
  date: string,   //2021-05-18 14:34:32
);
```
