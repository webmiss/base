## 引入
```javascript
import wmSwipe from '@/components/swipe/index.vue'
import wmSwipeItem from '@/components/swipe/item/index.vue'
```

## 轮播图
```html
<wm-swipe>
  <wm-swipe-item></wm-swipe-item>
</wm-swipe>
```
- direction: {type: String, default: 'horizontal'},       //方向: horizontal、vertical
- slide: {type: Object, default: {
-   loop: true,                                           //是否循环
-   autoplay: true,                                       //自动切换
-   interval: 3000,                                       //播放间隔
-   speed: 400,                                           //动画时长
- }},
- isPage: {type: Boolean, default: true},                 //显示分页
- pageColor: {type: String, default: 'rgba(0,0,0,.2)'},   //分页颜色
- pageColorActive: {type: String, default: '#6FB737'},    //激活颜色

