## 引入
```javascript
import HtmlObserve from '@/library/inc/html-observe'
```

## 使用
```javascript
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
