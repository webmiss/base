## 引入
```javascript
import HtmlLoad from '@/library/html/load'
import HtmlObserve from '@/library/html/observe'
```

## 加载Css和JS
```typescript
HtmlLoad(
  files: Array<string>,     //文件: ['file']
  reload: boolean=false,    //是否刷新
  type: string=''           //类型: js、css
);
```

## 监听容器
```typescript
HtmlObserve(
  element: any,                       //监听对象
  callback: Function,                 //回调函数
  options: MutationObserverInit = {   //配置
    attributes: true,
    childList: true,
    subtree: true,
  },
);
```
