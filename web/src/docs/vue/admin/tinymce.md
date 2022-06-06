## 引入
```javascript
import wmTinymce from '@/components/tinymce/index.vue'
```

## 编辑器
```html
<wm-tinymce></wm-tinymce>
```
- value: {type: String, default: ''},                             //内容
- upload: {default: {url: '', width: 0, height: 0, param: {}}},   //上传
- height: {type: Number, default: 480},                           //高度
- language: {type: String, default: 'zh_CN'},                     //语言
- menubar: {type: Boolean, default: false},                       //菜单
- plugins: {type: String, default: 'advlist autolink lists link image charmap print preview - anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount'},
- toolbar: {type: String, default: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media | removeformat | preview help'},
- @update:value                                                   //事件

