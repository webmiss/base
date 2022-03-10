<template>
  <div class="wm-tinymce_body">
    <div class="wm-tinymce" :class="classId">{{placeholder}}</div>
  </div>
</template>

<style scoped>
.wm-tinymce_body{width: 100%;}
.wm-tinymce_load{line-height: 40px; text-align: center; font-size: 12px; color: #999;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '../../library/ui/toast'
import Storage from '../../library/Storage'
import Post from '../../library/request/post'
import HtmlLoad from '../../library/html/load'
import ImgReader from '../../library/plus/img/reader'
export default defineComponent({
  name: 'TinyMCE',
  props: {
    classId: {type: String, default: 'TinyMCE'},                    //标识
    config: {default: {}},                                          //配置
    value: {type: String, default: ''},                             //内容
    upload: {default: {url: '', width: 0, height: 0, param: {}}},   //上传
    placeholder: {type: String, default: ''},                       //提示
  },
  data(){
    const editor: any = null;
    const defInit: any = {
      selector: '.'+this.classId,
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
        // 编辑器
        this.editor = editor;
        // 监听内容
        // editor.on('NodeChange Change KeyUp SetContent', ()=>{
        //   this.$emit('update:value', editor.getContent());
        // });
      }
    };
    return {editor, defInit};
  },
  watch:{
    value(val){
      this.editor.setContent(val);
    }
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init() {
      // 加载
      HtmlLoad(['/tinymce/tinymce.min.js']);
      // 配置
      const cfg: any = this.config;
      for(let key in cfg){
        this.defInit[key] = cfg[key];
      }
      // 图片上传
      if(this.upload.url!='') {
        this.defInit.paste_data_images = true;
        this.defInit.images_upload_handler = (blobInfo: any, succFun: any, failFun: any)=>{
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
        }
      }
      // 启动
      this.start(this.defInit);
    },

    /* 启动 */
    start(cfg: any) {
      try{
        // @ts-ignore
        tinymce.init(cfg);
      } catch(e){
        setTimeout(()=>{ this.start(cfg); }, 1000);
      }
    },

    /* 获取内容 */
    getContent(){
      return this.editor.getContent();
    },

  },
});
</script>