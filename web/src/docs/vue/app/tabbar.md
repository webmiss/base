## 引入
```javascript
import WmTabbar from '@/components/tabbar/index.vue'
import WmTabbarPage from '@/components/tabbar/page.vue'
```

## 导航菜单
```html
<wm-tabbar></wm-tabbar>
```
- data: {type: Object, default: []},                        //数据: [{lable: '首页', icon: 'icons icon_home'}]
- active: {type: Number, default: 0},                       //默认菜单
- activeColor: {type: String, default: Env.themes.primary}, //默认菜单
- height: {type: String, default: '54px'},                  //高度
- @update:active  //事件

## 页面
```html
<wm-tabbar-page>
  内容
</wm-tabbar-page>
```
- show: {type: Boolean, default: false},                //显示
- height: {type: String, default: 'calc(100% - 54px)'}, //高度
- bgColor: {type: String, default: '#FFF'},             //背景颜色
- time: {type: Number, default: 400},                   //动画时间

