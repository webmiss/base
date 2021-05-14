<template>
  <div>
    <div class="wm-tinymce" v-html="content"></div>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import HtmlLoad from '../../library/inc/html-load'

export default defineComponent({
  name: 'TinyMCE',
  props: {
    config: {default: {}},  //配置
    content: {default: ''}, //内容
  },
  data(){
    let tmpContent: any = '';
    let defInit: any = {
      selector: '.wm-tinymce',
      language: 'zh_CN',
      height: 480,  //高度
      menubar: true,  //菜单条
      branding: false,  //水印
      elementpath: false, //底部元素路径
      toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media preview | removeformat | help',
      toolbar_items_size: 'small',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      content_style: "img {max-width:100%;}",
      init_instance_callback: (editor: any)=>{
        // 监听内容
        editor.on('input', ()=>{
          this.$emit('update:value', editor.getContent());
        });
      }
    };
    return {defInit, tmpContent};
  },
  watch:{
    config(val: any){
      console.log('init');
    },
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init() {
      HtmlLoad(['/tinymce/tinymce.min.js']);
      setTimeout(()=>{
        // @ts-ignore
        tinymce.init(this.defInit);
        // 内容
        this.tmpContent = this.content;
      }, 600);
    },

  },
});
</script>