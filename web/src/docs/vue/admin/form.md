## 引入
```javascript
import wmForm from '@/components/form/index.vue'
import wmFormTitle from '@/components/form/title/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
```

## 表单
```html
<wm-form></wm-form>
```
- labelWidth: {type: String, default: '90px'},
- labelHeight: {type: String, default: '40px'},

## 表单-标题
```html
<wm-form-title></wm-form-title>
```
- fontSize: {type: String, default: '15px'},

## 表单-行
```html
<wm-form-item></wm-form-item>
```
- type: {type: String, default: 'label'},
- label: {type: String, default: ''},

## 按钮
```html
<wm-button></wm-button>
```
- type: {type: String, default: 'primary'},   //类型: primary、info、warning、danger
- effect: {type: String, default: 'dark'},    //样式: plain、dark
- height: {type: String, default: '40px'},    //高度
- padding: {type: String, default: '0 24px'}, //间距
- fontSize: {type: String, default: '14px'},  //字体大小
- disabled: {type: Boolean, default: false},  //是否禁用

## 多选
```html
<wm-checkbox></wm-checkbox>
```
- value: {default: ''},                       //checkbox[value]
- label: {type: String, default: ''},         //名称
- checked: {type: Boolean, default: false},   //是否选中
- disclick: {type: Boolean, default: false},  //禁用Click
- @update:checked                             //事件

## 单选
```html
<wm-radio></wm-radio>
```
- data: {type: Array, default: []}, //数据: [{label:'男',value:'男'},{label:'女',value:'女'}]
- value: {default: ''},             //默认值: val
- @update:value                     //事件

## 输入框
```html
<wm-input></wm-input>
```
- value: {default: ''},                           //值
- type: {type: String, default: 'text'},          //类型: input属性
- maxlength: {type: String, default: ''},         //最大字符: 默认
- placeholder: {type: String, default: ''},       //提示: 无
- width: {type: String, default: '100%'},         //宽度: '100%'
- maxWidth: {type: String, default: 'auto'},      //宽度: '100%'
- height: {type: String, default: '40px'},        //高度: '40px'
- lineHeight: {type: String, default: '20px'},    //行高: '20px'
- padding: {type: String, default: '10px 16px'},  //间距: '10px 16px'
- align: {type: String, default: ''},             //文本对齐方式: 'left'
- @update:value //事件
