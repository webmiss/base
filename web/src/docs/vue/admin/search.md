## 引入
```javascript
import wmSearch from '@/components/search/index.vue'
```

## 搜索
```html
<wm-search>
  <li>
    <wm-input v-model:value="sea.form.name" placeholder="商品名称" clearable />
  </li>
</wm-search>
```
- show: {type:Boolean, default:false},    //是否显示
- @updata:submit                          //点击搜索
