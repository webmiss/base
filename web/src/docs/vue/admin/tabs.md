## 引入
```javascript
import wmTabs from '@/components/tabs/index.vue'
```

## 标签页
```html
<wm-tabs v-model:active="active" :data="data">
  <template #tab1>内容1</template>
  <template #tab2>内容2</template>
</wm-tabs>
```
- active: {type:String, default:''},  //默认选择
- data: {type:Array, default:[]},     //数据: [{label:'Tab1', name:'tab1'},{label:'Tab2', - name:'tab2'}]
