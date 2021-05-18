## 引入
```javascript
import Toast from '@/library/ui/toast'
import UiBack from '@/library/ui/back'
import Loaging from '@/library/ui/loading'
import NavigateTo from '@/library/ui/navigate-to'
```

## 轻提示
```typescript
Toast(
  text: string='提示',  //提示内容
  time: number = 3000,  //倒计时关闭
);
```

## 返回
```typescript
UiBack(
  num: number=1,  //步长
);
```

## 加载
```typescript
// 动画
const load: any = Loading();
// 关闭
load.clear();
```

## 跳转
```typescript
NavigateTo(
  url: string,  //页面路径
  parm?: any,   //传参
);
```
