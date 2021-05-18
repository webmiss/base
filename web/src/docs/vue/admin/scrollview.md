## 引入
```javascript
import wmScrollView from '@/components/scroll-view/index.vue'
```

## 滑动层
```html
<wm-scroll-view>
  内容
</wm-scroll-view>
```
- probeType: {type: Number, default: 3},                                  //派发Scroll事件: 0不派发、1间隔(手指)、2一直派发(手指)、3全部派发
- scrollX: {type: Boolean, default: false},                               //滚动-横向
- scrollY: {type: Boolean, default: true},                                //滚动-纵向
- startX: {type: Number, default: 0},                                     //初始化位置-横轴
- startY: {type: Number, default: 0},                                     //初始化位置-纵轴
- loading: {type: Number, default: 48},                                   //Loading高度
- loadingTheme: {type: String, default: 'flow'},                          //样式: flow、swing、circle、wave
- loadingColor: {type: String, default: Env.themes.primary},              //Loading颜色
- upper: {type: Number, default: 64},                                     //顶部距离
- lower: {type: Number, default: 80},                                     //底部距离
- upperText: {type: String, default: '已刷新'},                           //刷新文本
- lowerText: {type: String, default: '正在加载'},                         //加载文本
- upperColor: {type: String, default: Env.themes.text2},                  //刷新颜色
- lowerColor: {type: String, default: Env.themes.text2},                  //加载颜色
- isUpper: {type: Boolean, default: true},                                //是否下拉
- isLower: {type: Boolean, default: true},                                //是否上拉
- scrollbar: {type: Object, default: {fade: false, interactive: true}},   //滚动条
- preventDefault: {type: Boolean, default: true},                         //允许浏览器复制
- @down   //事件: 下拉
- @up     //事件: 上拉
- @scroll //事件: 滚动

