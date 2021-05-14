<template>
  <div>
    <div class="wm-tinymce" v-html="content"></div>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '../../library/ui/ui-toast'
import Storage from '../..//library/ui/storage'
import Post from '../../library/ui/request-post'
import HtmlLoad from '../../library/inc/html-load'
import ImgReader from '../../library/plus/img-reader'
export default defineComponent({
  name: 'TinyMCE',
  props: {
    config: {default: {}},  //配置
    content: {default: ''}, //内容
    upload: {default: {start: false, width: 0, height: 0, url: ''}}, //图片上传
  },
  data(){
    let defInit: any = {
      selector: '.wm-tinymce',
      language: 'zh_CN',
      height: 480,  //高度
      menubar: false,  //菜单条
      branding: false,  //水印
      elementpath: false, //底部元素路径
      toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media | removeformat | preview help',
      toolbar_items_size: 'small',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      content_style: "img {max-width:100%;}",
      init_instance_callback: (editor: any)=>{
        // 监听内容
        editor.on('NodeChange Change KeyUp SetContent', ()=>{
          this.$emit('update:value', editor.getContent());
        });
      }
    };
    return {defInit};
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init() {
      HtmlLoad(['/tinymce/tinymce.min.js']);
      setTimeout(()=>{
        // 配置
        const cfg: any = this.config;
        for(let key in cfg){
          this.defInit[key] = cfg[key];
        }
        // 图片上传
        if(this.upload.start) {
          this.defInit.paste_data_images = true;
          this.defInit.images_upload_handler = (blobInfo: any, succFun: any, failFun: any)=>{
            // 压缩
            const fileObj = blobInfo.blob();
            ImgReader(fileObj, {width: this.upload.width, height: this.upload.height}, (base64: string)=>{
              // 提交
              Post(this.upload.url, {token:Storage.getItem('token'), base64: base64}, (res: any)=>{
                const d = res.data;
                if(d.code==0) succFun(d.img);
                else succFun('');
                return Toast(d.msg);
              });
            });
          }
        }
        // @ts-ignore
        tinymce.init(this.defInit);
      }, 600);
    },

  },
});
</script>