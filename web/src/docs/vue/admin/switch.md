## 引入
```javascript
import wmSwitch from '@/components/switch/index.vue'
```

## 开关
```html
<wm-switch></wm-switch>
```
- value: {type: Boolean, default: false},                               //值
- activeColor: {type: String, default: Env.themes.primary.plain[0]},    //打开颜色
- inactiveColor: {type: String, default: Env.themes.text.plain[3]},     //关闭颜色
- @update:value                                                         //事件

