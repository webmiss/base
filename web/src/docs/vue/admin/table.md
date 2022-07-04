## 引入
```javascript
import wmTable from '@/components/table/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTableOrder from '@/components/table/order.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
```

## 表格
```html
<wm-table ref="Table" :data="page.list">
  <template #title>
    <td>ID</td>
    <td>名称</td>
  <template>
  <tr v-for="(val,key) in page.list" :key="key">
    <td width="30" class="checkbox wm-table_checkbox">
      <wm-checkbox :value="val.id"></wm-checkbox>
    </td>
    <td>{{ val.id }}</td>
    <td>{{ val.name }}</td>
  </tr>
</wm-table>
```
- data: {type:Array, default:[]},             //数据: [{id:val},{id:val}]
- isTitle: {type: Boolean, default: true},    //显示标题
- isCheckbox: {type: Boolean, default: true}, //显示多选框
- setCheck(type: boolean)                     //全选&不选
- getVals()                                   //获取选中值
- getRow(name: string='id')                   //获取单条
- getData(name: string='id')                  //获取多条

## 表单布局
```html
<wm-table-form>
  <tr>
    <td class="lable">ID</td>
    <td></td>
    <td class="lable">名称</td>
    <td></td>
  </tr>
</wm-table-form>
```
- width: {type: String, default: '80px'},      //lable宽度
- margin: {type: String, default: '4px 0'},    //外部间距
- bgColor: {type: String, default: '#FFF'},    //背景颜色

## 排序
```html
<wm-table-order :value="oby.list.id" @update:value="OrderBy('id', $event)" />
```
- value: {default: ''},      //值: ''、ASC、DESC
```javascript
/* 排序 */
OrderBy(name: string, val: string){
  for(let i in this.oby.list) this.oby.list[i] = i==name?val:'';
  this.oby.name = val?name+' '+ val:'';
  this.loadData();
},
```
- const oby: any = {id:''}};
