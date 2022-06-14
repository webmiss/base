## 引入
```javascript
import wmForm from '@/components/form/index.vue'
import wmFormTitle from '@/components/form/title/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmSelect from '@/components/form/select/index.vue'
import wmCascader from '@/components/form/cascader/index.vue'
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

## 输入框
```html
<wm-input></wm-input>
```
- value: {default: ''},                             //值
- type: {type: String, default: 'text'},            //类型: input属性
- maxlength: {type: String, default: ''},           //最大长度: 默认
- minlength: {type: String, default: ''},           //最小长度: 默认
- placeholder: {type: String, default: '请输入'},   //提示: 无
- width: {type: String, default: '100%'},           //宽度: '100%'
- maxWidth: {type: String, default: 'auto'},        //宽度: '100%'
- height: {type: String, default: '40px'},          //高度: '40px'
- lineHeight: {type: String, default: '20px'},      //行高: '20px'
- padding: {type: String, default: '10px 16px'},    //间距: '10px 16px'
- align: {type: String, default: ''},               //文本对齐方式: 'left'
- borderRadius: {type: String, default: '4px'},     //边框圆角: '4px'
- disabled: {type: Boolean, default: false},        //是否禁用
- clearable: {type: Boolean, default: false},       //一键清空
- @update:value //事件

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

## 多选组
```html
<wm-checkbox-group v-model:value="form.checkbox" :data="checkbox"></wm-checkbox-group>
```
- value: {type: Array, default: []},    //获取值
- data: {type: Array, default: []},     //数据: [{label:'游戏', value: 1},{label:'购物', value: 2, checked: true},{label:'其他', value: 3, disabled: true}]

## 单选
```html
<wm-radio></wm-radio>
```
- data: {type: Array, default: []}, //数据: [{label:'男',value:'男', disabled: true},{label:'女',value:'女'}]
- value: {default: ''},             //默认值: val
- @update:value                     //事件

## 下拉菜单
```html
<wm-select></wm-select>
```
- value: {type:String, default:''},               //默认选择
- data: {type:Array, default:[]},                 //数据: [{label:'Option1', value:'option1', disabled: true},{label:'Option2', value:'option2'}]
- width: {type:String, default:'100%'},           //宽度
- height: {type:String, default:'40px'},          //高度
- placeholder: {type:String, default:'请选择'},   //提示信息
- maxHeight: {type:String, default:'160px'},      //最大高度
- clearable: {type: Boolean, default: false},       //一键清空
- @update:value   //事件

## 级联选择器
```html
<wm-cascader></wm-cascader>
```
- value: {type:Array, default:[]},                //默认值
- data: {type:Array, default:[]},                 //数据: [{label:'A', value:'1', children: [{label:'1', value:'3'},{label:'2', value:'4'}]},{label:'b', value:'2', disabled: true}];
- width: {type:String, default:'100%'},           //宽度
- height: {type:String, default:'40px'},          //高度
- placeholder: {type:String, default:'请选择'},   //提示信息
- maxWidth: {type:String, default:'180px'},       //最大宽度
- maxHeight: {type:String, default:'180px'},      //最大高度
- clearable: {type: Boolean, default: false},     //一键清空
- checkStrictly: {type: Boolean, default: false}, //选择任意
- @update:value   //事件
