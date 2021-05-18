## 引入
```javascript
import wmTable from '@/components/table/index.vue'
import wmTableTitle from '@/components/table/title/index.vue'
import wmTableTr from '@/components/table/tr/index.vue'
```

#### 表格
```html
<wm-table></wm-table>
```
- data: {type:Array, default:[]}, //数据: [{id:val},{id:val}]


#### 标题
```html
<wm-table-title></wm-table-title>
```
- checkbox: {type: Boolean, default: true}, //多选
- checked: {type: Boolean, default: false}, //全选&不选

#### Tr行
```html
<wm-table-tr></wm-table-tr>
```
- checkbox: {type: Boolean, default: true}, //多选
- value: {default:''},                      //checkbox[value]
