## 引入
```javascript
import wmMenu from '@/components/menu/index.vue'
```

## 导航菜单
```html
<wm-menu></wm-menu>
```
- data: {type: Array, default: []},                     //数据: [{icon:'',label:'标题',value:'',children:[]}]
- defaultIndex: {type: Array, default: []},             //默认选择
- isSave: {type: Boolean, default: true},               //是否记录位置
- height: {type: Number, default: 32},                  //高度
- textColor: {type: String, default: Env.themes.text1}, //颜色

