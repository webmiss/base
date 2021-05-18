## 引入
```javascript
import wmPageView from '@/components/page-view/index.vue'
```

## 页面容器
```html
<wm-page-view>
  <template #left>Left</template>
  <template #title>Title</template>
  <template #right>Right</template>
  <template #body>内容</template>
</wm-page-view>
```
- immersed: {type: Boolean, default: false},                //沉浸式
- header: {type: Boolean, default: true},                   //隐藏头部
- color: {type: String, default: Env.statusBar.color},      //文本颜色
- bgColor: {type: String, default: Env.statusBar.bgColor},  //背景颜色

