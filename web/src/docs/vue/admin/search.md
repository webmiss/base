## 引入
```javascript
import wmSearch from '@/components/search/index.vue'
```

## 搜索
```html
<wm-search>
  内容
</wm-search>
```
- data: {type:Array, default:[]},                 //数据: [{label:'Search1', value:'search1'},{label:'Search2', value:'search2'}]
- width: {type:String, default:'100%'},           //宽度
- placeholder: {type:String, default:'请输入'},   //提示信息
- noneText: {type:String, default:'暂无结果'},    //暂无提示
