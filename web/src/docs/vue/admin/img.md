## 引入
```javascript
import wmImg from '@/components/img/index.vue'
import wmImgUpload from '@/components/img/upload/index.vue'
import wmImgView from '@/components/img/view/index.vue'
```

## 图片
```html
<wm-img></wm-img>
```
- url: {type: String, default: ''},         //图片地址
- size: {type: String, default: 'cover'},   //背景大小
- width: {type: String, default: '90px'},   //宽
- height: {type: String, default: '40px'},  //高
- radius: {type: String, default: '0px'},   //圆角
- title: {type: String, default: ''},       //提示
- icoSize: {type: String, default: '32px'}, //图标大小

## 上传
```html
<wm-img-upload></wm-img-upload>
```
- url: {type: String, default: ''},           //上传地址
- width: {type: Number, default: 200},        //宽
- height: {type: Number, default: 200},       //高
- param: {type: Object, default: {}},         //提交参数
- title: {type: String, default: '上传图片'}, //提示

## 预览
```html
<wm-img-view></wm-img-view>
```
- show: {type: Boolean, default: false},                                //显示
- opacity: {type: Number, default: 0.8},                                //背景透明度
- loadColor: {type: String, default: '#6FB737'},                        //Load颜色
- iconLoading: {type: String, default: 'ui ui_loading'},                //Load图标
- iconLeft: {type: String, default: 'ui ui_arrow_left'},                //上一页
- iconRight: {type: String, default: 'ui ui_arrow_right'},              //下一页
- iconFull: {type: String, default: 'ui ui_video_fullscreen'},          //全屏
- iconNoFull: {type: String, default: 'ui ui_video_fullscreen_exit'},   //全屏
- iconClose: {type: String, default: 'ui ui_close'},                    //关闭
- @update:close                                                         //事件-关闭
