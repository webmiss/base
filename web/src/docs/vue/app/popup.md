## 引入
```javascript
import wmPopup from '@/components/popup/index.vue'
```

## 弹出层
```html
<wm-popup></wm-popup>
```
- show: {type: Boolean, default: false},        //是否显示
- position: {type: String, default: 'center'},  //位置: left、right、top、bottom
- opacity: {type: Number, default: 0.4},        //背景透明度
- bgColor: {type: String, default: ''},         //内容背景颜色
- bgClose: {type: Boolean, default: true},      //点击背景关闭
- time: {type: Number, default: 400},           //动画时间

