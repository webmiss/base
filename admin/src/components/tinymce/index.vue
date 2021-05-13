<template>
  <div class="wm-tinymce" v-html="content"></div>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import HtmlLoad from '../../library/inc/html-load'
export default defineComponent({
  name: 'TinyMCE',
  props: {
    init: {default: {}},    //配置
    content: {default: ''}, //内容
  },
  data(){
    let defInit: any = {
      selector: '.wm-tinymce',
      language: 'zh_CN',
      height: 480,
      menubar: true,
      branding: false,
      toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media preview | removeformat | help',
      toolbar_items_size: 'small',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      content_style: "img {max-width:100%;}",
      init_instance_callback: (editor: any)=>{
        // 监听输入
        editor.on('input', ()=>{
          this.getContent();
        });
      }
    };
    return {defInit};
  },
  watch:{
    init(val: any){
      console.log('init');
    },
  },
  mounted(){
    this.setInit();
  },
  methods:{

    /* 初始化 */
    setInit() {
      HtmlLoad(['/tinymce/tinymce.min.js']);
      setTimeout(()=>{
        // console.log(this.defInit);
        // @ts-ignore
        tinymce.init(this.defInit);
      },600);
    },

    /* 获取内容 */
    getContent(index: number=0, codeURI: boolean=false) {
      // @ts-ignore
      const ct: any = tinyMCE.editors[index].getContent();
      return codeURI?encodeURIComponent(ct):ct;
    },

  },
});
</script>