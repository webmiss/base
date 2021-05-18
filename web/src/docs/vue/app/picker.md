## 引入
```javascript
import wmPicker from '@/components/picker/index.vue'
import wmPickerDate from '@/components/picker/date.vue'
```

## 选择器
```html
<wm-picker></wm-picker>
```
- show: {type: Boolean, default: false},          //是否显示
- data: {type: Array, default: []},               //数据: [{label: '云南',value: 'yn', children:[]}]
- defaultIndex: {type: Array, default: [0,0,0]},  //是否显示
- title: {type: String, default: ''},             //标题
- cancelText: {type: String, default: '取消'},    //取消文本
- confirmText: {type: String, default: '确定'},   //确定文本
- @update:show  //事件: 显示
- @confirm      //事件: 确定
- @cancel       //事件: 取消
- @change       //事件: 变化


## 日期选择器
```html
<wm-picker-date></wm-picker-date>
```
- show: {type: Boolean, default: false},        //是否显示
- title: {type: String, default: '选择年月日'}, //标题
- maxDate: {type: Object, default: null},       //最大时间, 例如: new Date(2021,10,1)
- minDate: {type: Object, default: null},       //最小时间, 例如: new Date(1970,1,1)
- default: {type: Array, default: []},          //默认值: [2020,10,5]
- cancelText: {type: String, default: '取消'},  //取消文本
- confirmText: {type: String, default: '确定'}, //确定文本
- @update:show  //事件: 显示
- @confirm      //事件: 确定
- @cancel       //事件: 取消

