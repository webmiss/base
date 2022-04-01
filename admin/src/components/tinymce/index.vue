<template>
  <editor :api-key="key" :init="defInit" v-model="content"></editor>
</template>

<style scoped>
.wm-tinymce_body{width: 100%;}
.wm-tinymce_load{line-height: 40px; text-align: center; font-size: 12px; color: #999;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import Env from '@/env'
import Toast from '../../library/ui/toast'
import Storage from '../../library/Storage'
import Post from '../../library/request/post'
import ImgReader from '../../library/plus/img/reader'
export default defineComponent({
  name: 'TinyMCE',
  components: {Editor},
  props: {
    value: {type: String, default: ''},                             //内容
    upload: {default: {url: '', width: 0, height: 0, param: {}}},   //上传
    height: {type: Number, default: 480},                           //高度
    language: {type: String, default: 'zh_CN'},                     //语言
    menubar: {type: Boolean, default: false},                       //菜单
    plugins: {type: String, default: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount'},
    toolbar: {type: String, default: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media | removeformat | preview help'},
  },
  data(){
    const key: any = Env.tinymceKey;
    const content: string = '';
    const defInit: any = {
      language: this.language,
      height: this.height,
      menubar: this.menubar,
      branding: false,  //水印
      elementpath: false, //底部元素路径
      plugins: this.plugins,
      toolbar: this.toolbar,
      toolbar_items_size: 'small',
      images_upload_handler: (blobInfo: any, succFun: any, failFun: any)=>{
        this.upImg(blobInfo, succFun, failFun);
      },
      content_style: "img {max-width:100%;}",
    };
    return {key, content, defInit};
  },
  watch:{
    value(val){
      this.content = val;
    },
    content(val){
      this.$emit('update:value', val);
    },
  },
  mounted(){
  },
  methods:{

    /* 图片上传 */
    upImg(blobInfo: any, succFun: any, failFun: any) {
      if(this.upload.url=='') return Toast('无上传地址!');
      // 压缩
      const fileObj = blobInfo.blob();
      ImgReader(fileObj, {width: this.upload.width, height: this.upload.height}, (base64: string)=>{
        // 参数
        const form: any = {
          token: Storage.getItem('token'),
          base64: base64,
        }
        const param: any = this.upload.param || {};
        for(let i in param) form[i]=param[i];
        // 提交
        Post(this.upload.url, form, (res: any)=>{
          const d = res.data;
          if(d.code==0) succFun(d.img);
          else succFun('');
          return Toast(d.msg);
        });
      });
    },

  },
});
</script>